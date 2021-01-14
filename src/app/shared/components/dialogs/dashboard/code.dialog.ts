// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
	selector: 'app-code',
	templateUrl: './code.dialog.html',
	styleUrls: ['./code.dialog.scss'],
})
export class QrCodeDialog {

	constructor (
		public dialogRef: MatDialogRef<QrCodeDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}
