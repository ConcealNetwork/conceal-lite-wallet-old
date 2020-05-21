import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Import Services
import { AuthService } from './../../shared/services/auth.service';

@Component({
	selector: 'app-lock',
	templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({opacity:0}),
          animate(400, style({opacity:1}))
        ]),
        transition(':leave', [
          style({opacity:1}),
          animate(400, style({opacity:0}))
        ])
      ]
    ),
    trigger('stagger', [
      transition('* => *', [
        query('#cards', style({ opacity: 0, transform: 'translateX(-40px)' }), {optional: true}),
        query('#cards', stagger('300ms', [
          animate('600ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ]), {optional: true}),
        query('#cards', [
          animate(1000, style('*'))
        ], {optional: true})
      ])
    ])
  ]
})
export class LockComponent implements OnInit {

  @Input() error: string | null;
  @Input() success: string | null;
  @Output() submitEM = new EventEmitter();

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

  isLoading: boolean = true;
  isFormLoading: boolean = false;
  isLoggedIn: boolean = false;

	constructor(private AuthService: AuthService) { }

	ngOnInit(): void {
		this.isLoading = false;
  }
  
  submit() {
    if (this.form.valid) {
      this.isFormLoading = true;
      this.submitEM.emit(this.form.value);
      this.AuthService.login(this.form.value.email, this.form.value.password, this.form.value.twofa).subscribe(
        data => { 
          if (data['message'].token && data['result'] === 'success') {
            this.AuthService.setToken(data['message'].token);
            this.success = 'Success!';
            this.isLoggedIn = false;
            this.isFormLoading = false;
          }
          if (data['result'] === 'success') {
            this.success = 'Success!';
            this.isLoggedIn = false;
            this.isFormLoading = false;
          }
          if (data['result'] === 'error') {
            this.error = data['message'];
            this.isFormLoading = false;
          }
        },
        error => {
            console.log(error);
            this.error = error.message;
            this.isFormLoading = false;
        }
      );
    }
  }

}
