// Angular Core
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// 3rd Party
import { EChartOption } from 'echarts';
import * as moment from 'moment';

// Services
import { CloudService } from './../../shared/services/cloud.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None,
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
	echartsIntance: any;
	height;
	portfolio;
	wallets;
	marketData;
	marketLabels;
	refreshInterval = 60;

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
			this.marketLabels = [];
			this.marketData = (data['market_data'].sparkline_7d.price);
			let len = this.marketData.length;
			let duration = moment.duration(7 / len, 'd').asMilliseconds();
			let i = 0;
			for (i = len - 1; i >= 0; i--) {
				this.marketLabels.push(moment().subtract(duration * (i + 1), 'ms').format('YYYY-MM-DD'));
			}
			this.echartsIntance?.setOption({
				xAxis: {
					data: [...this.marketLabels]
				},
				series: [{
					data: [...this.marketData] 
				}]
			})
			this.isLoading = false;
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
			}
		});

	}
	
	ngAfterViewInit(): void {
		// timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
		setTimeout(() => this.disableAnimation = false);
	}

  onChartInit(echarts) {
		this.echartsIntance = echarts;
	}

	market: EChartOption = {
		grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
		},
		tooltip: {
			trigger: 'axis',
			textStyle: {
				color:'rgba(255,255,255,0.95)',
			},
			backgroundColor: 'rgba(0,0,0,0.5)',
			borderColor: '#ffa500',
			borderWidth: 1,
      position: function (pt) {
          return [pt[0], '10%'];
      }
		},
		toolbox: {},
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        right: '5%',
        left: '5%',
        bottom: 15,
        start: 0,
        end: 100
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 50,
        end: 100
      }
		],
		xAxis: {
			type: 'category',
			scale: true,
      boundaryGap: false,
			data: [],
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
			boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
		},
		series: <any> [{
      type: 'line',
      symbol: 'none',
      sampling: 'max',
      smooth: false,
      itemStyle: {
        color: 'none',
        shadowBlur: 0
      },
      lineStyle: {
				width: 3,
				color: '#ffa500'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1, 
              color: '#ffa5004a'
            }
          ],
        }
      },
      data: [],
    }],
    animation: true,
    animationEasing: 'quarticIn'
	};

	formattedStringAmount = ({
		amount,
		currency = 'CCX',
		formatOptions = { minimumFractionDigits: 5, maximumFractionDigits: 5 },
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

}
