// Angular Core
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { HelperService } from '../../../services/helper.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new.contact.dialog.html',
	styleUrls: ['./new.contact.dialog.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class NewContactDialog {

  constructor (
		public dialogRef: MatDialogRef<NewContactDialog>,
		private helperService: HelperService,
		private dataService: DataService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	getHelperService() {
		return this.helperService;
	}

	getDataService() {
		return this.dataService;
	}

	form: FormGroup = new FormGroup({
		labelFormControl: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(35),
			Validators.required,
		]),
		addressFormControl: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		paymentidFormControl: new FormControl('', [
			Validators.minLength(35),
			Validators.maxLength(35),
		])
	});

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.helperService.addContact(
				this.form.value.labelFormControl,
				this.form.value.addressFormControl,
				this.form.value.paymentidFormControl
			);
		}
	}

	close() {
		this.dialogRef.close(true);
	}

}