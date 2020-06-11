// Angular Core
import { Injectable } from '@angular/core';

// 3rd Party
import * as moment from 'moment';

// Services
import { ElectronService } from '../services/electron.service';
import { CloudService } from '../services/cloud.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
	providedIn: 'root'
})

export class HelperService {

	isWalletLoading: boolean = true;
	isLoading: boolean = true;
	marketData = [];
	marketLabels = [];
	prices: any;
	height: number = 0;
	portfolio: any;
	wallets: any;
	walletCount: number = 0;
	transactions: any;
	success: any;
	error: any;

	isFormLoading: any;
	haveKeys: any;
	keys: any;

	constructor (
		private cloudService: CloudService,
		private electronService: ElectronService,
		private snackbarService: SnackbarService,
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

		getPrices() {
			this.cloudService.getPrices().subscribe((data) => {
				this.prices = data;
				console.log(data);
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

		getWalletKeys(address, code) {
		  this.cloudService.getWalletKeys(address, code).subscribe((data) => {
			  if (data['result'] === 'success') {
				  this.success = 'Success! Loading Keys...';
					this.isFormLoading = false;
					setTimeout(() => {
				  	this.haveKeys = true;
						this.keys = data['message'];
					}, 2000);
			  } else {
				  this.error = data['message'];
					this.isFormLoading = false;
					this.snackbarService.openSnackBar(data['message'], 'Dismiss');
			  }
		  })
		}

		importWallet(privateSpendKey) {
			this.cloudService.importWallet(privateSpendKey).subscribe((data) => {
				if (data['result'] === 'success') {
					this.success = 'Success! Importing Wallet...';
					this.isFormLoading = false;
					setTimeout(() => {
						this.snackbarService.openSnackBar('Wallet Imported', 'Dismiss');
						this.refreshWallets();
					}, 2000);
				} else {
					this.error = data['message'];
					this.isFormLoading = false;
					this.snackbarService.openSnackBar(data['message'], 'Dismiss');
				}
			})
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
					this.snackbarService.openSnackBar('Wallet Deleted', 'Dismiss');
					this.refreshWallets();
				} else {
					this.snackbarService.openSnackBar(data['message'], 'Dismiss');
				}
			})
		}

		createWallet() {
			this.isLoading = true;
			this.cloudService.createWallet().subscribe((data) => {
				if (data['result'] === 'success') {
					this.snackbarService.openSnackBar('Wallet Created', 'Dismiss');
					this.refreshWallets();
				} else {
					this.snackbarService.openSnackBar(data['message'], 'Dismiss');
				}
			})
		}

		copyToClipboard(value: string, message: string): void {
			this.electronService.clipboard.clear();
			this.electronService.clipboard.writeText(value);
			this.snackbarService.openSnackBar(message, 'Dismiss');
		}

		formattedStringAmount(amount, currency, symbol): any {
			const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
			return `${symbol ? symbol : ''} ${parseFloat(amount).toLocaleString(undefined, formatOptions)} ${currency ? currency : ''} `;
		};

		FormattedAmount(amount, currency, symbol) {

			let minimumFractionDigits;
			let maximumFractionDigits;

			switch (currency) {
				case 'BTC':
					minimumFractionDigits = 8;
					maximumFractionDigits = 8;
					break;
				case 'USD':
					minimumFractionDigits = 2;
					maximumFractionDigits = 2;
					break;
				default:
					minimumFractionDigits = 2;
					maximumFractionDigits = 2;
					break;
			}

			const formatOptions = { minimumFractionDigits, maximumFractionDigits };

			return this.formattedStringAmount(amount, currency, symbol);

		};

	}