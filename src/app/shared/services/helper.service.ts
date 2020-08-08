// Angular Core
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// 3rd Party
import * as moment from 'moment';

// Services
import { ElectronService } from '../services/electron.service';
import { DataService } from '../services/data.service';
import { CloudService } from '../services/cloud.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
	providedIn: 'root'
})

export class HelperService {

	constructor (
		private electronService: ElectronService,
		private cloudService: CloudService,
		private dataService: DataService,
		private snackbarService: SnackbarService,
		private dialog: MatDialog,
		private router: Router
	) { }

	getMarket() {
		if (this.dataService.marketData.length !== 0 || this.dataService.marketLabels.length !== 0) {
			this.dataService.marketData = [];
			this.dataService.marketLabels = [];
		}
		this.cloudService.getMarketData().subscribe((data) => {
			sessionStorage.setItem('market_data', JSON.stringify(data));
			this.dataService.marketData.push(...data['market_data'].sparkline_7d.price);
			let len = this.dataService.marketData.length;
			let duration = moment.duration(7 / len, 'd').asMilliseconds();
			let i = 0;
			for (i = len - 1; i >= 0; i--) {
				this.dataService.marketLabels.push(moment().subtract(duration * (i + 1), 'ms').fromNow());
			}
		})
	}

	getWallets() {
		this.dataService.isLoading = true;
		this.dataService.isWalletLoading = true;
		this.cloudService.getWalletsData().subscribe((data) => {
			if (data['result'] === 'success') {

				this.dataService.height = data['message'].height;
				this.dataService.wallets = data['message'].wallets;

				this.dataService.walletCount = Object.keys(this.dataService.wallets).length;
				this.dataService.available = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].balance + this.dataService.wallets[curr].locked || acc, 0);
				this.dataService.pending = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].locked || acc, 0);
				this.dataService.withdrawable = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].balance || acc, 0);
				this.dataService.transactionCount = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].transactions.length || acc, 0);

				this.cloudService.getPrices('btc').subscribe((data) => {
					this.dataService.priceBTC = data['conceal'].btc;
					this.dataService.portfolioBTC = (this.dataService.priceBTC * this.dataService.available);
				})
				this.cloudService.getPrices('usd').subscribe((data) => {
					this.dataService.priceUSD = data['conceal'].usd;
					this.dataService.portfolioUSD = (this.dataService.priceUSD * this.dataService.available);
				})
				this.dataService.isLoading = false;
				this.dataService.isWalletLoading = false;
			}
		});
	}

	refreshWallets() {
		this.dataService.isWalletLoading = true;
		this.cloudService.getWalletsData().subscribe((data) => {
			if (data['result'] === 'success') {

				this.dataService.height = data['message'].height;
				this.dataService.wallets = data['message'].wallets;

				this.dataService.walletCount = Object.keys(this.dataService.wallets).length;
				this.dataService.available = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].balance + this.dataService.wallets[curr].locked || acc, 0);
				this.dataService.pending = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].locked || acc, 0);
				this.dataService.withdrawable = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].balance || acc, 0);
				this.dataService.transactionCount = Object.keys(this.dataService.wallets).reduce((acc, curr) => acc + this.dataService.wallets[curr].transactions.length || acc, 0);

				this.cloudService.getPrices('btc').subscribe((data) => {
					this.dataService.priceBTC = data['conceal'].btc;
					this.dataService.portfolioBTC = (this.dataService.priceBTC * this.dataService.available);
				})
				this.cloudService.getPrices('usd').subscribe((data) => {
					this.dataService.priceUSD = data['conceal'].usd;
					this.dataService.portfolioUSD = (this.dataService.priceUSD * this.dataService.available);
				})
				this.dataService.isWalletLoading = false;
				this.dataService.isLoading = false;
			}
		});
	}

	getTransactions() {
		this.cloudService.getWalletsData().subscribe((data) => {
			this.dataService.wallets = data['message'].wallets;
			// Merge Transactions
			let transactions = Object.values(this.dataService.wallets);
			let arr = [];
			for(let i = 0; i < transactions.length; i++) {
					arr.push(transactions[i]['transactions']);
			}
			const transactionsMerged = Array.prototype.concat(...arr);
			this.dataService.transactions = transactionsMerged;
		});
	}

	getWalletKeys(address, code) {
		this.cloudService.getWalletKeys(address, code).subscribe((data) => {
			if (data['result'] === 'success') {
				this.dataService.success = 'Success! Loading keys...';
				this.dataService.isFormLoading = false;
				setTimeout(() => {
					this.dataService.isKeysLoaded = true;
					this.dataService.keys = data['message'];
				}, 2000);
			} else {
				this.dataService.error = data['message'];
				this.dataService.isFormLoading = false;
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	importWallet(privateSpendKey) {
		this.cloudService.importWallet(privateSpendKey).subscribe((data) => {
			if (data['result'] === 'success') {
				this.dataService.success = 'Success! Importing wallet...';
				this.dataService.isFormLoading = false;
				setTimeout(() => {
					this.snackbarService.openSnackBar('Wallet imported', 'Dismiss');
					this.refreshWallets();
				}, 2000);
			} else {
				this.dataService.error = data['message'];
				this.dataService.isFormLoading = false;
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	deleteWallet(wallet, balance) {
		if (balance == 0) {
			this.dataService.isLoading = true;
			this.cloudService.deleteWallet(wallet).subscribe((data) => {
				if (data['result'] === 'success') {
					this.snackbarService.openSnackBar('Wallet deleted', 'Dismiss');
					this.refreshWallets();
				} else {
					this.snackbarService.openSnackBar(data['message'], 'Dismiss');
				}
			})
		} else {
			this.snackbarService.openSnackBar('Wallet not empty! Transfer funds first', 'Dismiss');
		}
	}

	createWallet() {
		this.dataService.isLoading = true;
		this.cloudService.createWallet().subscribe((data) => {
			if (data['result'] === 'success') {
				this.snackbarService.openSnackBar('Wallet created', 'Dismiss');
				this.refreshWallets();
			} else {
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	getMessages() {
		this.dataService.isLoading = true;
		this.cloudService.getMessages().subscribe((data) => {
			if (data['result'] === 'success') {
				// Merge Transactions
				let messages = Object.values(data['message']);
				let arr = [];
				for(let i = 0; i < messages.length; i++) {
						arr.push(messages[i]);
				}
				const messagesMerged = Array.prototype.concat(...arr);
				this.dataService.messages = messagesMerged;
				this.dataService.isLoading = false;
			} else {
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
				this.dataService.isLoading = false;
			}
		})
	};

	sendMessage(address, message, twoFACode, wallet) {
		this.cloudService.sendMessage(address, message, twoFACode, wallet).subscribe((data) => {
			if (data['result'] === 'success') {
				this.dataService.success = 'Your message was sent successfully, redirecting now...';
				this.dataService.isFormLoading = false;
				setTimeout(() => {
					this.router.navigate(['/dashboard']);
					this.dialog.closeAll();
					this.snackbarService.openSnackBar('Your message was sent successfully', 'Dismiss');
				}, 2000);
			} else {
				this.dataService.error = data['message'];
				this.dataService.isFormLoading = false;
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	getContacts() {
		this.dataService.isLoading = true;
		this.cloudService.getContacts().subscribe((data) => {
			if (data['result'] === 'success') {
				// Merge Transactions
				let contacts = Object.values(data['message'].addressBook);
				let arr = [];
				for(let i = 0; i < contacts.length; i++) {
						arr.push(contacts[i]);
				}
				const contactsMerged = Array.prototype.concat(...arr);
				this.dataService.contacts = contactsMerged;
				this.dataService.isLoading = false;
			} else {
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
				this.dataService.isLoading = false;
			}
		})
	};

	copyToClipboard(value: string, message: string): void {
		this.electronService.clipboard.clear();
		this.electronService.clipboard.writeText(value);
		this.snackbarService.openSnackBar(message, 'Dismiss');
	}

	createSnackbar(message: string): void {
		this.snackbarService.openSnackBar(message, 'Dismiss');
	}

	transferFrom(wallet, option) {
		this.dataService.selectedWallet = wallet;
		this.dataService.selectedTab = option;
		this.selectedWallet(wallet);
		this.router.navigate(['/transfer']);
	}

	selectedWallet(wallet) {
		this.dataService.balance = this.dataService.wallets[wallet].balance;
		this.dataService.sendAmount = 0;
	}

	toWallet(wallet) {
		this.dataService.toBalance = this.dataService.wallets[wallet].balance;
	}

	percentageOfBalance(percent) {
		if (this.dataService.balance) this.dataService.sendAmount = ((percent / 100) * this.dataService.balance);
	}

	transferFunds(amount, wallet, address, paymentID, message, code) {
		this.cloudService.createTransaction(amount, wallet, address, paymentID, message, code).subscribe((data) => {
			if (data['result'] === 'success') {
				this.dataService.success = 'Your transaction was successful, redirecting now...';
				this.dataService.isFormLoading = false;
				setTimeout(() => {
					this.router.navigate(['/dashboard']);
					this.dialog.closeAll();
					this.snackbarService.openSnackBar('Your transaction was successful', 'Dismiss');
				}, 2000);
			} else {
				this.dataService.error = data['message'];
				this.dataService.isFormLoading = false;
				this.snackbarService.openSnackBar(data['message'], 'Dismiss');
			}
		})
	}

	formattedStringAmount(amount, currency, symbol): any {
		const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		return `${symbol ? symbol : ''} ${parseFloat(amount).toLocaleString('en', formatOptions)} ${currency ? currency : ''} `;
	};

	formatAmount(amount, minDec, maxDec): any {
		const formatOptions = { minimumFractionDigits: minDec, maximumFractionDigits: maxDec };
		return `${parseFloat(amount).toLocaleString('en', formatOptions)}`;
	};

	formatAddress(address) {
		return address.slice(0,7) + '...' + address.slice(-7);
	}

	formatDatetime(datetime) {
		return moment(datetime).fromNow(); //eg. 1 day ago, 2 hours ago etc
	}

	formatTypeText(type) {
		if (type === 'in') return 'Received';
		if (type === 'out') return 'Sent';
	}

}