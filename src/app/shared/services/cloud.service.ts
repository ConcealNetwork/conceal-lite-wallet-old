import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CloudService {

	api = AppConfig.walletAPI;

	constructor(private http: HttpClient) { }

	getWalletsData() {
		return this.http.get(`${this.api}/wallet/unified`);
	};

	getMarketData() {
		if (sessionStorage.getItem('market_data') !== null) {
			return new Observable(observer => {
				observer.next(JSON.parse(sessionStorage.getItem('market_data')));
				observer.complete();
			})
		} else {
			return this.http.get('https://api.coingecko.com/api/v3/coins/conceal?sparkline=true');
		}
	};

	getPrices() {
    return this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal&vs_currencies=btc&include_last_updated_at=true`)
  };

	getWalletKeys(address, code) {
		return this.http.get(`${this.api}/wallet/keys?address=${address}&code=${code}`);
	};

	deleteWallet(address) {
		return this.http.delete(`${this.api}/wallet?address=${address}`);
	};

	createWallet() {
		return this.http.post(`${this.api}/wallet/`, null);
	};

	importWallet(privateSpendKey) {
		privateSpendKey = JSON.stringify({ privateSpendKey });
		return this.http.post(`${this.api}/wallet/import`, privateSpendKey);
	};

}