// Angular
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { HelperService } from '../../../services/helper.service';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-enable2fa',
	templateUrl: './enable2fa.dialog.html',
	styleUrls: ['./enable2fa.dialog.scss'],
  animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class Enable2faDialog {

	qrCode: any;

	form: FormGroup = new FormGroup({
		twofaFormControl: new FormControl('', [
		Validators.minLength(6),
		Validators.maxLength(6),
			Validators.pattern('^[0-9]*$'),
			Validators.required,
		])
	});

	constructor (
		private helperService: HelperService,
		private dataService: DataService,
		private authService: AuthService,
		public dialogRef: MatDialogRef<Enable2faDialog>)
	{
		this.authService.getQRCode().subscribe((data) => {
			if (data['result'] === 'success') {
				this.qrCode = data['message'].qrCodeUrl;
			}
		})
	}

	getDataService() {
		return this.dataService;
	}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.authService.enable2FA(this.form.value.twofaFormControl, true).subscribe((data) => {
				if (data['result'] === 'success') {
					this.dataService.success = 'Success! 2FA is now enabled';
					this.dataService.isFormLoading = false;
					this.helperService.checkFor2FA();
					setTimeout(() => {
						this.dialogRef.close(true);
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