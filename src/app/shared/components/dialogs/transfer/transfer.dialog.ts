// Angular Core
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { HelperService } from '../../../services/helper.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.dialog.html',
	styleUrls: ['./transfer.dialog.scss'],
  animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class TransferDialog {

	confirmed: boolean = false;

	form: FormGroup = new FormGroup({
		amountFormControl: new FormControl({value: this.data.amount, disabled: true},[
			Validators.required,
		]),
		walletFormControl: new FormControl({value: this.data.wallet, disabled: true},[
			Validators.required,
		]),
		toaddressFormControl: new FormControl({value: this.data.address, disabled: true},[
			Validators.required,
		]),
		paymentidFormControl: new FormControl({value: this.data.paymentID || '', disabled: true},[
			//Validators.required,
		]),
		messageFormControl: new FormControl({value: this.data.message || '', disabled: true},[
			//Validators.required,
		]),
		feeFormControl: new FormControl({value: this.dataService.fee, disabled: true},[
			//Validators.required,
		]),
	});

  constructor(
		public dialogRef: MatDialogRef<TransferDialog>,
		private helperService: HelperService,
		private dataService: DataService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (this.dataService.hasTwoFa) {
			this.form.addControl('twofaFormControl', new FormControl('', [
				Validators.minLength(6),
				Validators.maxLength(6),
				Validators.pattern('^[0-9]*$'),
				Validators.required,
			]))
		}
		if (!this.dataService.hasTwoFa) {
			this.form.addControl('passwordFormControl', new FormControl('', [
				Validators.required,
			]))
		}
	}

	getDataService() {
		return this.dataService;
	}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			let amount = (this.data.amount - this.dataService.fee);
			let password = this.form.value.passwordFormControl || '';
			let code = this.form.value.twofaFormControl || '';
			this.helperService.transferFunds(
				amount.toFixed(6),
				this.data.wallet,
				this.data.address,
				this.data.paymentID,
				this.data.message,
				code,
				password
			);
		}
	}

	close() {
		this.dialogRef.close(true);
	}

}