// Angular Core
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { HelperService } from '../../services/helper.service';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'exportkeys',
	templateUrl: './exportkeys.component.html',
	styleUrls: ['./exportkeys.component.scss']
})
export class ExportKeysDialog {

	@Input() error: string | null;
	@Input() success: string | null;
	@Output() submitEM = new EventEmitter();

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
		public dialogRef: MatDialogRef<ExportKeysDialog>,	@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	submit() {
		if (this.form.valid) {
			this.dataService.error = null;
			this.dataService.isFormLoading = true;
			this.submitEM.emit(this.form.value);
			this.helperService.getWalletKeys(this.data, this.form.value.twofaFormControl);
		}
	}

	close() {
		this.dialogRef.close(true);
	}

}