// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// 3rd Party
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';

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
export class DashboardComponent implements OnInit {

	isLoading: boolean = true;
	disableAnimation: boolean = true;
	refreshInterval: number = 60;
	height: number = 0;
	portfolio: any;
	wallets: any;
	marketData = [];
	marketLabels = [];

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

		this.CloudService.getMarketData().subscribe((data) => {
			localStorage.setItem('market_data', JSON.stringify(data));
			this.marketData.push(...data['market_data'].sparkline_7d.price);
			let len = this.marketData.length;
			let duration = moment.duration(7 / len, 'd').asMilliseconds();
			let i = 0;
			for (i = len - 1; i >= 0; i--) {
				this.marketLabels.push(moment().subtract(duration * (i + 1), 'ms').format('YYYY-MM-DD'));
			}
		})

		this.CloudService.getWallets().subscribe((data) => {
			if (data['result'] === 'success') {
				this.height = data['message'].height;
				this.wallets = data['message'].wallets;
				this.portfolio = {
					available: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].balance + this.wallets[curr].locked || acc, 0),
					pending: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].locked || acc, 0),
					withdrawable: Object.keys(this.wallets).reduce((acc, curr) => acc + this.wallets[curr].balance || acc, 0),
				}
				this.isLoading = false;
			}
		});
	}

	lineChartData: ChartDataSets[] = [
    { 
			data: this.marketData,
			label: 'Price',
			fill: true,
			backgroundColor: 'rgba(255, 165, 0, 0.2)',
			borderColor: 'rgb(255, 165, 0)',
			borderWidth: 2,
			pointRadius: 0,
		},
  ];

  lineChartLabels: Label[] = this.marketLabels;

  lineChartOptions = {
		responsive: true,
		animation: false,
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		scales: {
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          fontSize: 10,
          callback: amount => `${formattedStringAmount({ amount, currency: 'USD', useSymbol: true })}`
        },
        gridLines: {
          color: 'rgba(255, 255, 255, .08)'
        },
      }],
      xAxes: [{
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
          maxRotation: 0,
          minRotation: 0,
        },
        gridLines: {
          color: 'rgba(255, 255, 255, .08)'
        },
      }],
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    tooltips: {
			mode: 'index',
			borderColor: 'rgba(255, 165, 0, 0.8)',
			borderWidth: 1,
      intersect: false,
      callbacks: {
        label: item => `${formattedStringAmount({ amount: item.value, currency: 'USD', useSymbol: true })}`
      }
    },
	};

  lineChartColors: Color[] = [
    {
			backgroundColor: 'rgba(255, 165, 0, 0.3)',
			borderColor: 'rgb(255, 165, 0)',
    },
  ];

  lineChartType = 'line';

}

export const formattedStringAmount: any = ({
  amount,
  currency = 'CCX',
  formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  showCurrency,
  useSymbol,
}) => {
  let c = '';
  const symbols = { USD: '$', BTC: 'B' };
  if (showCurrency || useSymbol) {
    c = useSymbol
      ? symbols[currency]
      : currency;
  }
  return `${useSymbol ? c : ''} ${parseFloat(amount).toLocaleString(undefined, formatOptions)} ${!useSymbol ? c : ''}`;
};