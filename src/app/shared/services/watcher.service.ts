// Angular
import { Injectable } from '@angular/core';

// Services
import { DataService } from '../../shared/services/data.service';
import { HelperService } from '../../shared/services/helper.service';
import { DialogService } from '../../shared/services/dialog.service';


@Injectable({
	providedIn: 'root'
})

export class WatcherService {

	currTransactions: any;
	prevTransactions: any;

	constructor (
		private dataService: DataService,
		private helperService: HelperService,
		private dialogService: DialogService,
	) {

	}

	checkForWallet() {
		console.log('checking for no wallet')
		if(!this.dataService.hasWallet && !this.dataService.dialogOpen) {
			this.dialogService.openNoWalletDialog();
		}
	}

	checkForTransactions() {
		console.log('checking for new txs');
		this.helperService.getTransactions(true);
	}

	updateWallets() {
		console.log('checking wallets');
		this.helperService.getWallets(true);
	}

}