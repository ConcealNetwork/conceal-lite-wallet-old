// Angular
import { Injectable } from '@angular/core';

// Services
import { DataService } from '../../shared/services/data.service';
import { DialogService } from '../../shared/services/dialog.service';

@Injectable({
	providedIn: 'root'
})

export class WatcherService {

	constructor (
		private dataService: DataService,
		private dialogService: DialogService,
	) {	}

	checkForWallet() {
		console.log('checking for wallet...')
		if(!this.dataService.hasWallet && !this.dataService.dialogOpen) {
			this.dialogService.openNoWalletDialog();
		}
	}

}