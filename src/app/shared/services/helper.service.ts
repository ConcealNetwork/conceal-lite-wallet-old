// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

// 3rd Party
import * as moment from 'moment';

// Services
import { ElectronService } from './../../shared/services/electron.service';
import { CloudService } from './../../shared/services/cloud.service';

// Dialogs
import { WalletKeysDialog } from './../../shared/components/dialogs/privatekeys.component';
import { QrCodeDialog } from './../../shared/components/dialogs/qrcode.component';

@Injectable({
	providedIn: 'root'
})

export class HelperService { 

	isWalletLoading: boolean = true;
	isLoading: boolean = true;
	snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
	snackbarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
	marketData = [];
	marketLabels = [];
	height: number = 0;
	portfolio: any;
	wallets: any;
	walletCount: number = 0;
	transactions: any;

	constructor(
		private snackBar: MatSnackBar,
		private cloudService: CloudService,
		private electronService: ElectronService,
		public dialog: MatDialog,
	) { }

	getMarket() {
		if (this.marketData.length !== 0 || this.marketLabels.length !== 0) {
			this.marketData = [];
			this.marketLabels = [];
		}
		this.cloudService.getMarketData().subscribe((data) => {
			sessionStorage.setItem('market_data', JSON.stringify(data));
			this.marketData.push(...data['market_data'].sparkline_7d.price);
			let len = this.marketData.length;
			let duration = moment.duration(7 / len, 'd').asMilliseconds();
			let i = 0;
			for (i = len - 1; i >= 0; i--) {
				this.marketLabels.push(moment().subtract(duration * (i + 1), 'ms').fromNow());
			}
		})
	}

	getWallets() {
		this.isLoading = true;
		this.isWalletLoading = true;
		this.cloudService.getWalletsData().subscribe((data) => {
			if (data['result'] === 'success') {
				this.height = data['message'].height;
				this.wallets = data['message'].wallets;
				this.walletCount = Object.keys(this.wallets).length;
				this.portfolio = {
					available: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].balance + this.wallets[curr].locked || acc, 0),
					pending: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].locked || acc, 0),
					withdrawable: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].balance || acc, 0),
				}
				this.isLoading = false;
				this.isWalletLoading = false;
			}
		});
	}

	refreshWallets() {
		this.isWalletLoading = true;
		this.cloudService.getWalletsData().subscribe((data) => {
			if (data['result'] === 'success') {
				this.height = data['message'].height;
				this.wallets = data['message'].wallets;
				this.walletCount = Object.keys(this.wallets).length;
				this.portfolio = {
					available: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].balance + this.wallets[curr].locked || acc, 0),
					pending: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].locked || acc, 0),
					withdrawable: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].balance || acc, 0),
				}
				this.isWalletLoading = false;
				this.isLoading = false;
			}
		});
	}

	deleteWallet(wallet) {
		this.isLoading = true;
		this.cloudService.deleteWallet(wallet).subscribe((data) => {
			if (data['result'] === 'success') {
				this.openSnackBar('Wallet Deleted', 'Dismiss');
				this.refreshWallets();
			} else {
				this.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	createWallet() { 
		this.isLoading = true;
		this.cloudService.createWallet().subscribe((data) => { 
			if (data['result'] === 'success') {
				this.openSnackBar('Wallet Created', 'Dismiss');
				this.refreshWallets();
			} else {
				this.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	importWallet(privateSpendKey) { 
		this.cloudService.importWallet(privateSpendKey).subscribe((data) => { 
			if (data['result'] === 'success') {
				this.openSnackBar('Wallet Imported', 'Dismiss');
				this.refreshWallets();
			} else {
				this.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}


	copyToClipboard(value: string): void {
		this.electronService.clipboard.clear();
		this.electronService.clipboard.writeText(value);
		let message = 'Address Copied';
		this.openSnackBar(message, 'Dismiss');
	}

	openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
			duration: 8000,
			panelClass: 'notify',
			horizontalPosition: this.snackbarHorizontalPosition,
      verticalPosition: this.snackbarVerticalPosition,
		});
	}

	openCodeDialog(value): void {
    const dialogRef = this.dialog.open(QrCodeDialog, {
			width: '400px',
			height: '490px',
			data: value,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
	}

	openKeysDialog(value): void {
    const dialogRef = this.dialog.open(WalletKeysDialog, {
			width: '460px',
			height: 'auto',
			data: value,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
	}
	
	formattedStringAmount(amount, currency, symbol): any {
		const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		return `${symbol ? symbol : ''} ${parseFloat(amount).toLocaleString(undefined, formatOptions)} ${currency ? currency : ''} `;
	};

}