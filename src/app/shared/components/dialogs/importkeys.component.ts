// Angular
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-importkeys',
	templateUrl: './importkeys.component.html',
	styleUrls: ['./importkeys.component.scss']
})
export class ImportKeysDialog {

	form: FormGroup = new FormGroup({
		spendKeyFormControl: new FormControl('', [
		Validators.required
		])
	});

	constructor (
		private helperService: HelperService,
		private dataService: DataService,
		public dialogRef: MatDialogRef<ImportKeysDialog>,	@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	getDataService() {
		return this.dataService;
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
