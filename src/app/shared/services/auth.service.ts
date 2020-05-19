import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppConfig } from '../../../environments/environment';

const helper = new JwtHelperService();

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
		this.http.post(this.api + '/auth', JSON.stringify(body)).subscribe(
			data => {
				console.log("POST Request is successful ", data)
			},
			error => {
				console.log("Error", error)
			}
		)
	};

	loggedIn() {
		const token = this.getToken();
		return !!token && !helper.isTokenExpired(token);
  };

	setToken(token) {
		localStorage.setItem('token', token);
	}

	getToken() :any {
		localStorage.getItem('token');
	} 
	
	logout() {
		localStorage.removeItem('token');
	}
	
  decodeToken() {
		helper.decodeToken(this.getToken());
	}

}
