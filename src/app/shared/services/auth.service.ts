import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppConfig } from '../../../environments/environment';

const helper = new JwtHelperService();

export interface Data {
  message: string;
}

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(
		private http: HttpClient
	) {}

	api = AppConfig.walletAPI;
	token;

	login(email: string, password: string, twofa: string) {
		const body = {
			email,
			password,
			rememberme: false,
			code: twofa
		}
		return this.http.post(this.api + '/auth', JSON.stringify(body));
	};

	loggedIn() {
		const token = this.getToken();
		return !!token && !helper.isTokenExpired(token);
  };

	setToken(token) {
		localStorage.setItem('access_token', token);
	}

	getToken() :any {
		localStorage.getItem('access_token');
	} 
	
	logout() {
		localStorage.removeItem('access_token');
	}
	
  decodeToken() {
		helper.decodeToken(this.getToken());
	}

}
