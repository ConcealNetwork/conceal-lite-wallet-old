// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { HelperService } from '../../shared/services/helper.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
	animations: [
		trigger(
			'enterAnimation', [
				transition(':enter', [
					style({opacity:0}),
					animate(800, style({opacity:1}))
				])
			]
		),
		trigger('stagger', [
			transition(':enter', [
				query('.title', style({ opacity: 0, transform: 'translateX(-80px)' }), {optional: true}),
				query('.subtitle', style({ opacity: 0, transform: 'translateX(80px)' }), {optional: true}),
				query('#cards, .title, .subtitle ', stagger('1000ms', [
					animate('1000ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
				]), {optional: true}),
				query('#cards, .title, .subtitle', [
					animate(1000, style('*'))
				], {optional: true})
			])
		]),
		trigger('staggerDown', [
			transition(':enter', [
				query('button', style({ opacity: 0, transform: 'translateY(80px)' }), {optional: true}),
				query('button ', stagger('400ms', [
					animate('600ms 0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
				]), {optional: true}),
				query('button', [
					animate(600, style('*'))
				], {optional: true})
			])
		])
	]
})
export class AuthComponent implements OnInit {

	isSignUp: boolean = false;
	isSignIn: boolean = false;
	isResetPW: boolean = false;
	hasSignedUp: boolean = false;
	hasResetPW: boolean = false;

  signin: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ]),
    twofaFormControl: new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$')
    ])
	});

	signup: FormGroup = new FormGroup({
		usernameFormControl: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(24),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ])
	});

	pwreset: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
	});

	constructor (
		private authService: AuthService,
		private dataService: DataService,
		private helperService: HelperService,
    private router: Router
	) { }

	// Get Services
	getDataService() { return this.dataService }
	getHelperService() { return this.helperService }

	ngOnInit(): void {
		this.dataService.isLoggedIn = this.authService.loggedIn();
	}

	logout() {
		this.dataService.isLoading = true;
		this.authService.logout();
		this.dataService.isLoggedIn = this.authService.loggedIn();
		this.dataService.isLoading = false;
	}

	submitSignIn() {
		// Do Signin
		if (this.signin.valid) {
			this.dataService.success = '';
			this.dataService.error = '';
			this.dataService.isFormLoading = true;
			this.authService.login(this.signin.value.emailFormControl, this.signin.value.passwordFormControl, this.signin.value.twofaFormControl).subscribe(
				data => {
					if (data['message'].token && data['result'] === 'success') {
						this.authService.setToken(data['message'].token);
						this.dataService.success = 'Success!';
						this.dataService.isFormLoading = false;
						setTimeout(() => {
							this.router.navigate(['/']);
						}, 2000);
					}
					if (data['result'] === 'success') {
						this.dataService.success = 'Success! Redirecting now...';
						this.dataService.isFormLoading = false;
						setTimeout(() => {
							this.router.navigate(['/']);
							this.dataService.success = '';
							this.dataService.error = '';
						}, 2000);
					}
					if (data['result'] === 'error') {
						this.dataService.error = data['message'];
						this.dataService.isFormLoading = false;
						setTimeout(() => {
							this.dataService.success = '';
							this.dataService.error = '';
						}, 5000);
					}
				},
				error => {
					this.dataService.error = error.message;
					this.dataService.isFormLoading = false;
				}
			);
		}
	}

  submitSignUp() {
		// Do Signup
		if (this.signup.valid) {
			this.dataService.success = '';
			this.dataService.error = '';
			this.dataService.isFormLoading = true;
			this.authService.signUpUser(this.signup.value.usernameFormControl, this.signup.value.emailFormControl, this.signup.value.passwordFormControl).subscribe((data) => {
				if (data['result'] === 'success') {
					this.dataService.success = 'Success! Signup completed';
					this.dataService.isFormLoading = false;
					setTimeout(() => {
						this.hasSignedUp = true;
						this.isSignUp = false;
						this.dataService.success = '';
						this.dataService.error = '';
					}, 2000);
				} else {
					this.dataService.error = data['message'];
					this.dataService.isFormLoading = false;
					setTimeout(() => {
						this.dataService.success = '';
						this.dataService.error = '';
					}, 5000);
				}
			})
		}
	}

	submitPwReset() {
		// Do PW Reset
		if (this.pwreset.valid) {
			this.dataService.success = '';
			this.dataService.error = '';
			this.dataService.isFormLoading = true;
			this.authService.resetPassword(this.pwreset.value.emailFormControl).subscribe((data) => {
				if (data['result'] === 'success') {
					this.dataService.success = 'Success! Your password has been reset';
					this.dataService.isFormLoading = false;
					setTimeout(() => {
						this.hasResetPW = true;
						this.isResetPW = false;
						this.dataService.success = '';
						this.dataService.error = '';
					}, 2000);
				} else {
					this.dataService.error = data['message'];
					this.dataService.isFormLoading = false;
					setTimeout(() => {
						this.dataService.success = '';
						this.dataService.error = '';
					}, 5000);
				}
			})
		}
	}

}
