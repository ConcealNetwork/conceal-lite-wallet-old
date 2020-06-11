// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Dialogs
import { QrCodeDialog } from '../components/dialogs/qrcode.component';
import { NewMessageDialog } from '../components/dialogs/new-message.component';
import { NewContactDialog } from '../components/dialogs/new-contact.component';
import { ImportKeysDialog } from '../components/dialogs/importkeys.component';
import { ExportKeysDialog } from '../components/dialogs/exportkeys.component';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	success: any;
	error: any;

	constructor (
		public dialog: MatDialog
	) { }


	openCodeDialog(value): void {
		const dialogRef = this.dialog.open(QrCodeDialog, {
			width: '400px',
			height: 'auto',
			data: value,
		})
		dialogRef.afterClosed().subscribe(result => {
			//console.log('The dialog was closed');
			this.success = '';
			this.error = '';
		})
	}

	openExportKeysDialog(value): void {
		const dialogRef = this.dialog.open(ExportKeysDialog, {
			width: '460px',
			height: 'auto',
			data: value,
		})
		dialogRef.afterClosed().subscribe(result => {
			//console.log('The dialog was closed');
			this.success = '';
			this.error = '';
		})
	}

	openImportKeysDialog(): void {
		const dialogRef = this.dialog.open(ImportKeysDialog, {
			width: '460px',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
			//console.log('The dialog was closed');
			this.success = '';
			this.error = '';
		})
	}

	openNewMessageDialog(value): void {
    const dialogRef = this.dialog.open(NewMessageDialog, {
			width: '45%',
			height: 'auto',
      data: {address: value.address, message: value.message}
    })
    dialogRef.afterClosed().subscribe(result => {
			//console.log('The dialog was closed');
			this.success = '';
			this.error = '';
    })
	}

	openNewContactDialog(value): void {
    const dialogRef = this.dialog.open(NewContactDialog, {
			width: '45%',
			height: 'auto',
      data: {label: value.label, address: value.address, paymentid: value.paymentid}
    })
    dialogRef.afterClosed().subscribe(result => {
			//console.log('The dialog was closed');
			this.success = '';
			this.error = '';
    })
  }

}