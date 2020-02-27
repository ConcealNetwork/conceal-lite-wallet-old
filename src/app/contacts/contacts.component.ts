import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

	isLoading: boolean = true;

	constructor() { }

	ngOnInit(): void {
		this.isLoading = false;
	}

}
