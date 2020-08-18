// Angular
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

// Services
import { AuthService } from '../../shared/services/auth.service';
import { HelperService } from './../../shared/services/helper.service';
import { DataService } from '../../shared/services/data.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
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
		trigger('staggerLeft', [
			transition(':enter', [
				query('#cards', style({ opacity: 0, transform: 'translateX(-40px)' }), {optional: true}),
				query('#cards', stagger('300ms', [
					animate('400ms 0.35s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
				]), {optional: true}),
				query('#cards', [
					animate(1000, style('*'))
				], {optional: true})
			])
		]),
		trigger('staggerDown', [
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
export class SettingsComponent implements OnInit {

	currentLang: string;

	constructor(
		private translate: TranslateService,
		private authService: AuthService,
		private dialogService: DialogService,
		private helperService: HelperService,
		private dataService: DataService,
	) {
		this.helperService.getUser();
		this.translate.use('en');
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

	useLanguage(language: string) {
		this.translate.use(language);
		this.currentLang = language;
	}

	ngOnInit(): void {
		this.currentLang = this.translate.currentLang;
		this.dataService.isLoggedIn = this.authService.loggedIn();
		this.helperService.getMarket();
		this.helperService.getWallets();
		this.helperService.checkFor2FA();
	}

}
