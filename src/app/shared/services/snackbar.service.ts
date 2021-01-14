// Angular Core
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})

export class SnackbarService {

	snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
	snackbarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';

	constructor (
		private snackBar: MatSnackBar
	) { }

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 8000,
			panelClass: 'snak-notify',
			horizontalPosition: this.snackbarHorizontalPosition,
			verticalPosition: this.snackbarVerticalPosition,
		});
	}

	openSnackBarNo2FA(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 8000000,
			panelClass: 'snak-warning',
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
		});
	}

	openSnackBarEmailChange(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 8000000,
			panelClass: 'snak-warning',
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
		});
	}

	openSnackNewTransaction(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 8000000,
			panelClass: 'snak-warning',
			horizontalPosition: 'right',
			verticalPosition: 'bottom',
		});
	}

}