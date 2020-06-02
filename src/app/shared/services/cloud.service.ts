import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CloudService {

	constructor(private http: HttpClient) { }

	api = AppConfig.walletAPI;

	getWallets = () => {
		return this.http.get(`${this.api}/wallet/unified`);
	};

	getMarketData = () => {
		if (localStorage.getItem('market_data') !== null) {
			return new Observable(observer => {
				observer.next(JSON.parse(localStorage.getItem('market_data')));
				observer.complete();
			})
		} else {
			return this.http.get('https://api.coingecko.com/api/v3/coins/conceal?sparkline=true');
		}
	};

}