// Angular Core
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { HelperService } from '../../../services/helper.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new.message.dialog.html',
	styleUrls: ['./new.message.dialog.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class NewMessageDialog {

	confirmed: boolean = false;

  constructor (
		public dialogRef: MatDialogRef<NewMessageDialog>,
		private helperService: HelperService,
		private dataService: DataService,
		@Inject(MAT_DIALOG_DATA) public data: any
	)	{
			if(data.address) {
				this.helperService.getWallets();
				this.form.controls.toaddressFormControl.patchValue(this.data.address, { emitEvent: true });
			}
		}

	form: FormGroup = new FormGroup({
		twofaFormControl: new FormControl('', [
			Validators.minLength(6),
			Validators.maxLength(6),
			Validators.pattern('^[0-9]*$'),
			Validators.required,
		]),
		walletFormControl: new FormControl('', [
			Validators.required,
		]),
		toaddressFormControl: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
			this.matches.bind(this),
		]),
		messageFormControl: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(260),
			Validators.required,
		]),
		//selfdestructFormControl: new FormControl('', []),
		feeFormControl: new FormControl({value: this.dataService.fee, disabled: true},[
			//Validators.required,
		]),
	});

	getHelperService() {
		return this.helperService;
	}

	getDataService() {
		return this.dataService;
	}

	isFormValid() {
		this.form.controls.walletFormControl.markAsTouched();
		this.form.controls.toaddressFormControl.markAsTouched();
		this.form.controls.messageFormControl.markAsTouched();
		if (
			this.form.controls.walletFormControl.valid &&
			this.form.controls.toaddressFormControl.valid &&
			this.form.controls.messageFormControl.valid
		) {	this.confirmed = true; }
	}

	selectionChanged(value) {
		this.form.controls.walletFormControl.patchValue(value);
		this.form.controls.toaddressFormControl.updateValueAndValidity();
	}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.helperService.sendMessage(
				this.form.value.toaddressFormControl,
				this.form.value.messageFormControl,
				this.form.value.twofaFormControl,
				//this.form.value.selfdestructFormControl,
				this.form.value.walletFormControl
			);
		}
	}

	close() {
		this.dialogRef.close(true);
	}

	// custom validator
	private matches(control: FormControl): { [s: string]: boolean } {
		if (this.form && (control.value == this.form.controls.walletFormControl.value)) {
			return { match: true };
		}
		return null;
	}

}