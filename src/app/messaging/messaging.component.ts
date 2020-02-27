import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-messaging',
	templateUrl: './messaging.component.html',
	styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

	isLoading: boolean = true;

	constructor() { }

	ngOnInit(): void {
		this.isLoading = false;
	}

}
