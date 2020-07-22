// Angular Core
import { Injectable } from '@angular/core';

interface Wallets {
	address: any;
}

interface Height {
	height: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

	// Conditional Data
	isFullScreen: boolean = false;
	isWalletLoading: boolean = false;
	isLoading: boolean = false;
	isLoggedIn: boolean = false;
	isFormLoading: boolean = false;
	isKeysLoaded: boolean = false;

	// Market Data
	marketData: any = [];
	marketLabels: any = [];

	// Price Data
	priceBTC: number;
	priceUSD: number;

	// Portfolio Data
	portfolioBTC: number;
	portfolioUSD: number;

	// Wallet Data
	wallets: Wallets;
	height: Height;
	available: number;
	pending: number;
	withdrawable: number;
	walletCount: number;

	// Transaction Data
	transactions: any;
	transactionCount: number;
	keys: any;

	// Form Data
	success: string;
	error: string;

	// Transfer Data
	selectedTab: number = 0;
	selectedWallet: any;
	todWallet: any;
	sendAmount: number = 0;
	balance: number = 0;
	toBalance: number = 0;
	fee: number = 0.001000;

}