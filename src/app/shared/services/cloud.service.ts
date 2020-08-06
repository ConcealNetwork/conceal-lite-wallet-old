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

	getPrices(currency) {
		return this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal&vs_currencies=${currency}&include_last_updated_at=false`);
  };

	getWalletKeys(address, code) {
		return this.http.get(`${this.api}/wallet/keys?address=${address}&code=${code}`);
	};

	getMessages() {
    return this.http.get(`${this.api}/wallet/messages`);
	};

	sendMessage(address, message, password, sdm, twoFACode, wallet) {
		const body = {
			address, message, password, sdm, twoFACode, wallet
		};
		return this.http.post(`${this.api}/wallet/send-message`, JSON.stringify(body));
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

	createTransaction(amount, wallet, address, paymentID, message, code) {
		let client = '';
		let ref = '';
    const body = {
      amount: parseFloat(amount),
			wallet,  		// origin
			address,  	// destination
			paymentID, 	// destination ID
			message, 		// message
			code,				// 2FA code
			client,			// Client not used
			ref					// Ref not used
    };
		return this.http.put(`${this.api}/wallet`, JSON.stringify(body));
  };

}