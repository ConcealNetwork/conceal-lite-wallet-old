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
	marketData: any;
	marketLabels: any;
	prices: any;
	height: number;
	portfolio: any;
	wallets: any;
	walletCount: number;
	transactions: any;
	haveKeys: any;
	keys: any;
	formData: any;
	success: any;
	error: any;

}