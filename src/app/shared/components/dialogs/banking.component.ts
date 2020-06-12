// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
	selector: 'app-banking',
	templateUrl: './banking.component.html',
	styleUrls: ['./banking.component.scss'],
})
export class BankingDialog {

	constructor (
		public dialogRef: MatDialogRef<BankingDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}
