import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
	selector: 'qr-code',
	templateUrl: './qrcode.component.html',
	styleUrls: ['./qrcode.component.scss'],
})
export class QrCodeDialog {
	constructor(
		public dialogRef: MatDialogRef < QrCodeDialog > ,
		@Inject(MAT_DIALOG_DATA) public data: any) {}
	close() {
		this.dialogRef.close(true)
	}
}
