// Angular
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { HelperService } from '../../../services/helper.service';
import { DataService } from '../../../services/data.service';

@Component({
	selector: 'app-nowallet',
	templateUrl: './nowallet.dialog.html',
	styleUrls: ['./nowallet.dialog.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.4s ease-in', style({ opacity: 1}))
			])
		])
	]
})
export class NoWalletDialog {

	import: boolean = false;

	constructor (
		private helperService: HelperService,
		private dataService: DataService,
		public dialogRef: MatDialogRef<NoWalletDialog>
	) {
		this.dataService.dialogOpen = true;
	}

	form: FormGroup = new FormGroup({
		spendKeyFormControl: new FormControl('', [
		Validators.required
		])
	});

	getHelperService() {
		return this.helperService;
	}

	getDataService() {
		return this.dataService;
	}

	importWallet() {
		this.import = true;
	}

	createWallet() {
		this.dataService.isFormLoading = true;
		this.helperService.createWallet();
	}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.helperService.importWallet(this.form.value.spendKeyFormControl);
		}
	}

	close() {
		this.dialogRef.close(true);
	}

}
