// Angular
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.dialog.html',
	styleUrls: ['./change-password.dialog.scss'],
  animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class ChangePasswordDialog {

	form: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
	});

	constructor (
		private dataService: DataService,
		private authService: AuthService,
		private snackbarService: SnackbarService,
		public dialogRef: MatDialogRef<ChangePasswordDialog>
	) { }

	getDataService() {
		return this.dataService;
	}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.authService.changePassword(this.form.value.emailFormControl).subscribe((data) => {
				if (data['result'] === 'success') {
					this.dataService.success = 'Success! Your email has been changed';
					this.dataService.isFormLoading = false;
					setTimeout(() => {
						this.dialogRef.close(true);
						this.snackbarService.openSnackBarEmailChange('Please check your new email address to confirm the change.', 'Dismiss');
					}, 2000);
				} else {
					this.dataService.isFormLoading = false;
					this.dataService.error = data['message'];
				}
			})
		}
	}

	close() {
		this.dialogRef.close(true);
	}

}