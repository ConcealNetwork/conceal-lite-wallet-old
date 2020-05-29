// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Services
import { CloudService } from './../../shared/services/cloud.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
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
export class DashboardComponent implements OnInit {

	isLoading: boolean = true;
	disableAnimation: boolean = true;
	height: number;
	wallets: any;

	constructor(
		public matIconRegistry: MatIconRegistry,
		public domSanitizer: DomSanitizer,
		private CloudService: CloudService,
	) {
		matIconRegistry.addSvgIconSet(
			domSanitizer.bypassSecurityTrustResourceUrl(
				`assets/materal-icons-twotone.svg`
			)
		);
	 }

	ngOnInit(): void {
		this.isLoading = false;
		this.CloudService.getWallets().subscribe(
			data => {
				if (data['result'] === 'success') {
					this.height = data['message'].height;
					this.wallets = data['message'].wallets;
					console.log(this.wallets);
				}
				if (data['result'] === 'error') {
					this.wallets = null;
				}
			 },
			error => {
				console.log(error);
				this.wallets = null;
			 }
		);
	}
	
	ngAfterViewInit(): void {
		// timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
		setTimeout(() => this.disableAnimation = false);
	}
}
