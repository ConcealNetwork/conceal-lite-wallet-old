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
			panelClass: 'notify',
			horizontalPosition: this.snackbarHorizontalPosition,
			verticalPosition: this.snackbarVerticalPosition,
		});
	}

}