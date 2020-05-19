import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    twofa: new FormControl(''),
	});

  isLoading: boolean = true;
  isLoggedIn: boolean = false;

	constructor(private AuthService: AuthService) { }

	ngOnInit(): void {
		this.isLoading = false;
  }
  
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      //console.log(this.form.value);
      this.login(this.form.value.email, this.form.value.password, this.form.value.twofa);
    }
  }
  
  reset() {
    this.form.reset();
  }
	
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

	login(email,password,twofa) {
    this.AuthService.login(email,password,twofa);
    //console.log(email,password,twofa);
	}

}
