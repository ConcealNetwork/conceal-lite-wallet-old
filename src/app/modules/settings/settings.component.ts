// Import Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

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
		trigger('stagger', [
			transition(':enter', [
				query('#cards, .title, .subtitle', style({ opacity: 0, transform: 'translateX(-80px)' }), {optional: true}),
				query('#cards, .title, .subtitle', stagger('200ms', [
					animate('400ms 0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
				]), {optional: true}),
				query('#cards', [
					animate(1000, style('*'))
				], {optional: true})
			])
		])
	]
})
export class SettingsComponent implements OnInit {

	isLoading: boolean = true;
	currentLang: string;

	constructor(private translate: TranslateService) {
		this.translate.use('en');
	}

	useLanguage(language: string) {
		this.translate.use(language);
		this.currentLang = language;
	}

	ngOnInit(): void {
		this.isLoading = false;
		this.currentLang = this.translate.currentLang;
	}

}
