// Angular Core
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

	isFullScreen: boolean = false;
	isWalletLoading: boolean = false;
	isLoading: boolean = false;
	isLoggedIn: boolean = false;
	isFormLoading: boolean = false;
	marketData: any = [];
	marketLabels: any = [];
	available: number;
	pending: number;
	withdrawable: number;
	btcPrice: number;
	usdPrice: number;
	portfolioBTC: number;
	portfolioUSD: number;
	height: number;
	wallets: any;
	walletCount: number;
	transactions: any;
	transactionCount: number;
	haveKeys: any;
	keys: any;
	success: any;
	error: any;

}