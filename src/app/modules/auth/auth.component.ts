// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';

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
				]),
				transition(':leave', [
					style({opacity:1}),
					animate(400, style({opacity:0}))
				])
			]
		),
		trigger('stagger', [
			transition(':enter', [
				query('#cards, .title', style({ opacity: 0, transform: 'translateX(-80px)' }), {optional: true}),
				query('#cards, .title', stagger('200ms', [
					animate('400ms 0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
				]), {optional: true}),
				query('#cards', [
					animate(1000, style('*'))
				], {optional: true})
			])
		])
	]
})
export class AuthComponent implements OnInit {

  form: FormGroup = new FormGroup({
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

	constructor (
		private authService: AuthService,
		private dataService: DataService,
    private router: Router
	) { }

	// Get Services
	getDataService() { return this.dataService }

	ngOnInit(): void {
		this.dataService.isLoggedIn = this.authService.loggedIn();
	}

	logout() {
		this.dataService.isLoading = true;
		this.authService.logout();
		this.dataService.isLoggedIn = this.authService.loggedIn();
		this.dataService.isLoading = false;
	}

  submit() {
    if (this.form.valid) {
      this.dataService.error = null;
      this.dataService.isFormLoading = true;
      this.authService.login(this.form.value.emailFormControl, this.form.value.passwordFormControl, this.form.value.twofaFormControl).subscribe(
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
            }, 2000);
          }
          if (data['result'] === 'error') {
            this.dataService.error = data['message'];
            this.dataService.isFormLoading = false;
          }
        },
        error => {
            this.dataService.error = error.message;
            this.dataService.isFormLoading = false;
        }
      );
    }
  }

}
