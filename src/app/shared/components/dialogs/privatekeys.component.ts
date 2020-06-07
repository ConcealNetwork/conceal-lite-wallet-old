// Angular Core
import { Injectable } from '@angular/core';
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

// Services
import { ElectronService } from './../../services/electron.service';
import { CloudService } from './../../services/cloud.service';

@Injectable({
	providedIn: 'root'
})

@Component({
	selector: 'private-keys',
	templateUrl: './privatekeys.component.html',
	styleUrls: ['./privatekeys.component.scss'],
  })
  export class WalletKeysDialog {
  
	  @Input() error: string | null;
	  @Input() success: string | null;
	  @Output() submitEM = new EventEmitter();
  
	  snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'center';
	  snackbarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
	  isFormLoading: boolean = false;
	  haveKeys: boolean = false;
	  keys: any;
  
	  form: FormGroup = new FormGroup({
		  twofaFormControl: new FormControl('', [
			Validators.minLength(6),
			Validators.maxLength(6),
			  Validators.pattern('^[0-9]*$'),
			  Validators.required
		  ])
	  });
  
	constructor (
		  private cloudService: CloudService,
		  private electronService: ElectronService,
		  private snackBar: MatSnackBar,
		  public dialogRef: MatDialogRef<WalletKeysDialog>,	@Inject(MAT_DIALOG_DATA) public data: any
		  ) { }
  
	  submit() {
		  if (this.form.valid) {
			  this.error = null;
			  this.isFormLoading = true;
			  this.submitEM.emit(this.form.value);
			  this.getWalletKeys(this.data, this.form.value.twofaFormControl);
		  }
	  }
  
	  getWalletKeys(address, code) {
		  this.cloudService.getWalletKeys(address, code).subscribe((data) => {
			  if (data['result'] === 'success') {
				  this.success = 'Success! Loading Keys...';
				  this.isFormLoading = false;
				  this.haveKeys = true;
				  this.keys = data['message'];
			  } else {
				  this.error = data['message'];
				  this.isFormLoading = false;
			  }
		  })
	  }
  
	  copyToClipboard(value: string): void {
		  this.electronService.clipboard.clear();
		  this.electronService.clipboard.writeText(value);
		  let message = 'Key Copied';
		  this.openSnackBar(message, 'Dismiss');
	  }
  
	  openSnackBar(message: string, action: string) {
	  this.snackBar.open(message, action, {
			  duration: 2000,
			  panelClass: 'notify',
			  horizontalPosition: this.snackbarHorizontalPosition,
		verticalPosition: this.snackbarVerticalPosition,
		  });
	  }
  
	  close(){ this.dialogRef.close(true) }
  
  }