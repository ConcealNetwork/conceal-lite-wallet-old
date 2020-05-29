import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class CloudService {

	constructor(private http: HttpClient) { }

	api = AppConfig.walletAPI;

	getWallets = () => {
		return this.http.get(`${this.api}/wallet/unified`);
	};

}