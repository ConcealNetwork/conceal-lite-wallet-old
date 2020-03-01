import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
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
export class ActivityComponent implements OnInit {

	isLoading: boolean = true;

	constructor() { }

	ngOnInit(): void {
		this.isLoading = false;
	}

}
