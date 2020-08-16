import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConfig } from '../../../environments/environment';

export interface Data {
  message: string;
}

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(
		private http: HttpClient,
		public jwtHelper: JwtHelperService,
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
		return this.jwtHelper.isTokenExpired();
	};

	getExpireDate() {
		return this.jwtHelper.getTokenExpirationDate();
	}

	setToken(token) {
		localStorage.setItem('access_token', token);
	}

	getToken() :any {
		return localStorage.getItem('access_token');
	}

	logout() {
		localStorage.removeItem('access_token');
	}

  decodeToken() {
		this.jwtHelper.decodeToken(this.getToken());
	}

	getQRCode = () => {
		return this.http.post(this.api + '/two-factor-authentication/', null);
	};

	signUpUser(username, email, password) {
		const body = {
			name: username, email, password
		};
		return this.http.post(`${this.api}/user`, JSON.stringify(body));
	}

}
