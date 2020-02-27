import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-transfer',
	templateUrl: './transfer.component.html',
	styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

	isLoading: boolean = true;

	constructor() { }

	ngOnInit(): void {
		this.isLoading = false;
	}

}
