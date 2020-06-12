// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Dialogs
import { QrCodeDialog } from '../components/dialogs/qrcode.component';
import { NewMessageDialog } from '../components/dialogs/new-message.component';
import { NewContactDialog } from '../components/dialogs/new-contact.component';
import { ImportKeysDialog } from '../components/dialogs/importkeys.component';
import { ExportKeysDialog } from '../components/dialogs/exportkeys.component';
import { BankingDialog } from '../components/dialogs/banking.component';

// Services
import { DataService } from '../services/data.service';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	constructor (
		public dialog: MatDialog,
		private dataService: DataService
	) { }


	openQRCodeDialog(value): void {
		const dialogRef = this.dialog.open(QrCodeDialog, {
			width: '400px',
			height: 'auto',
			data: value,
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
		})
	}

	openExportKeysDialog(value): void {
		const dialogRef = this.dialog.open(ExportKeysDialog, {
			width: '460px',
			height: 'auto',
			data: value,
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
		})
	}

	openImportKeysDialog(): void {
		const dialogRef = this.dialog.open(ImportKeysDialog, {
			width: '460px',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
		})
	}

	openBankingDialog(): void {
		const dialogRef = this.dialog.open(BankingDialog, {
			width: '460px',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
		})
	}

	openNewMessageDialog(value): void {
    const dialogRef = this.dialog.open(NewMessageDialog, {
			width: '45%',
			height: 'auto',
      data: {address: value.address, message: value.message}
    })
    dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
	}

	openNewContactDialog(value): void {
    const dialogRef = this.dialog.open(NewContactDialog, {
			width: '45%',
			height: 'auto',
      data: {label: value.label, address: value.address, paymentid: value.paymentid}
    })
    dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
  }

}