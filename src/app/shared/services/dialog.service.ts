// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Dialog Components
import { ExportKeysDialog } from './../components/dialogs/dashboard/export.dialog';
import { ImportKeysDialog } from './../components/dialogs/dashboard/import.dialog';
import { NoWalletDialog } from './../components/dialogs/dashboard/nowallet.dialog';
import { QrCodeDialog } from './../components/dialogs/dashboard/code.dialog';
import { NewMessageDialog } from './../components/dialogs/messages/new.message.dialog';
import { NewContactDialog } from './../components/dialogs/contacts/new.contact.dialog';
import { BankingDialog } from './../components/dialogs/banking/banking.dialog';
import { TransferDialog } from './../components/dialogs/transfer/transfer.dialog';
import { Disable2faDialog } from './../components/dialogs/settings/disable2fa.dialog';
import { Enable2faDialog } from './../components/dialogs/settings/enable2fa.dialog';
import { ChangePasswordDialog } from './../components/dialogs/settings/change-password.dialog';

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
			width: '45%',
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
			width: '40%',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
		})
	}

	openBankingDialog(): void {
		const dialogRef = this.dialog.open(BankingDialog, {
			width: '40%',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
		})
	}

	openNewMessageDialog(address): void {
    const dialogRef = this.dialog.open(NewMessageDialog, {
			width: '45%',
			height: 'auto',
			data: {address: address}
    })
    dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
	}

	openTransferDialog(amount, wallet, address, message?, paymentID?): void {
    const dialogRef = this.dialog.open(TransferDialog, {
			width: '45%',
			height: 'auto',
      data: {amount: amount, wallet: wallet, address: address, message: message, paymentID: paymentID}
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
     // data: {label: value.label, address: value.address, paymentid: value.paymentid}
    })
    dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
	}

	openNoWalletDialog(): void {
    const dialogRef = this.dialog.open(NoWalletDialog, {
			width: '40%',
			height: 'auto',
			disableClose: true,
    })
	}

	openDisable2faDialog(): void {
    const dialogRef = this.dialog.open(Disable2faDialog, {
			width: '35%',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
	}

	openEnable2faDialog(): void {
    const dialogRef = this.dialog.open(Enable2faDialog, {
			width: '40%',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
	}

	openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialog, {
			width: '40%',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => {
			this.dataService.success = '';
			this.dataService.error = '';
    })
	}

}