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

	check2FA() {
		return this.http.get(`${this.api}/two-factor-authentication/enabled/`);
  };

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

	sendMessage(address, message, wallet, code, password) {
		const body = {
			address, message, wallet, code, password
		};
		return this.http.post(`${this.api}/wallet/send-message`, JSON.stringify(body));
	};

	getContacts() {
    return this.http.get(`${this.api}/user`);
	};

	addContact(label, address, paymentID, entryID=null, edit=false) {
		const body = {
			label, address, paymentID, entryID, edit
		};
		return this.http.post(`${this.api}/address-book`, JSON.stringify(body));
	}

	deleteContact(entryID) {
		return this.http.delete(`${this.api}/address-book/delete/entryID/${entryID}`);
	}

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

	createTransaction(amount, wallet, address, paymentID, message, code, password) {
		let client = '';
		let ref = '';
		if(!message) message = '';
		if(!paymentID) paymentID = '';
    let body = {
      amount: parseFloat(amount),
			wallet,  		// origin
			address,  	// destination
			paymentID, 	// destination ID
			message, 		// message
			code,				// 2FA code
			password,		// 2FA code
			client,			// Client not used
			ref					// Ref not used
		};
		return this.http.put(`${this.api}/wallet`, JSON.stringify(body));
  };

}