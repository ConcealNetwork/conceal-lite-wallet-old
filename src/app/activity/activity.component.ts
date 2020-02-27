import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

	isLoading: boolean = true;

	constructor() { }

	ngOnInit(): void {
		this.isLoading = false;
	}

}
