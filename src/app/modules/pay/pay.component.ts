// Angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Services
import { AuthService } from '../../shared/services/auth.service';
import { HelperService } from '../../shared/services/helper.service';
import { DataService } from '../../shared/services/data.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
	selector: 'app-pay',
	templateUrl: './pay.component.html',
	styleUrls: ['./pay.component.scss'],
	encapsulation: ViewEncapsulation.None,
	// issue with :enter animations and mat-expansion-panel
  animations: [
		// trigger('stagger1', [
		// 	transition(':enter', [
		// 		query('#panel', style({ opacity: 0, transform: 'translateX(-40px)' }), {optional: true}),
		// 		query('#panel', stagger('300ms', [
		// 			animate('400ms 0.35s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
		// 		]), {optional: true}),
		// 		query('#panel', [
		// 			animate(1000, style('*'))
		// 		], {optional: true})
		// 	])
		// ]),
		trigger('stagger2', [
			transition(':enter', [
				query('#title, #button', style({ opacity: 0, transform: 'translateY(-40px)' }), {optional: true}),
				query('#title, #button', stagger('300ms', [
					animate('400ms 0.35s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
				]), {optional: true}),
				query('#title, #button', [
					animate(1000, style('*'))
				], {optional: true})
			])
		])
  ]
})
export class PayComponent implements OnInit {

	step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

	constructor (
		private authService: AuthService,
		private helperService: HelperService,
		private dataService: DataService,
		private dialogService: DialogService,
    public matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer
	) {
		matIconRegistry.addSvgIconSet(
			domSanitizer.bypassSecurityTrustResourceUrl(
				`assets/fonts/materal-icons-twotone.svg`
			)
		);
	}

	// Get Services
	getDialogService() {
		return this.dialogService;
	}
	getHelperService() {
		return this.helperService;
	}
	getDataService() {
		return this.dataService;
	}

	ngOnInit(): void {
		this.helperService.getMarket();
		this.helperService.getWallets();
		this.dataService.isLoggedIn = this.authService.loggedIn();
		this.dataService.sendAmount = 0;
	}

}
