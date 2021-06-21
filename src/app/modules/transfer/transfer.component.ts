// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Services
import { AuthService } from '../../shared/services/auth.service';
import { HelperService } from './../../shared/services/helper.service';
import { DataService } from '../../shared/services/data.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
	selector: 'app-transfer',
	templateUrl: './transfer.component.html',
	styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

	step: number = 0;
	walletsValid: boolean = true;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
	}

	pay: FormGroup = new FormGroup({
		amountFormControl: new FormControl('', [
			Validators.pattern('^[0-9]+\.?[0-9]*$'),
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
		paymentidFormControl: new FormControl('', [
			Validators.minLength(64),
			Validators.maxLength(64),
		]),
		messageFormControl: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(260),
		]),
	});

	transfer: FormGroup = new FormGroup({
		amountFormControl: new FormControl('', [
			Validators.pattern('^[0-9]+\.?[0-9]*$'),
			Validators.required,
		]),
		walletFormControl: new FormControl('', [
			Validators.required,
		]),
		toaddressFormControl: new FormControl('', [
			Validators.required,
			this.matches.bind(this),
		]),
		messageFormControl: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(260),
		]),
	});

	constructor (
		private authService: AuthService,
		private helperService: HelperService,
		private dataService: DataService,
		private dialogService: DialogService,
    public matIconRegistry: MatIconRegistry,
    public domSanitizer: DomSanitizer
	) {
		matIconRegistry.addSvgIconSet(
			domSanitizer.bypassSecurityTrustResourceUrl(
				`assets/fonts/materal-icons-twotone.svg`
			)
		);
	}

	// Get Services
	getDialogService() {
		return this.dialogService;
	}
	getHelperService() {
		return this.helperService;
	}
	getDataService() {
		return this.dataService;
	}

	resetForms() {
		this.transfer.reset();
		this.pay.reset();
		this.dataService.balance = 0;
	}

	setAmount(value) {
		this.getHelperService().percentageOfBalance(value);
		this.transfer.controls.amountFormControl.patchValue(this.helperService.formatAmount(this.dataService.sendAmount, 1, 6), { emitEvent: true });
		this.pay.controls.amountFormControl.patchValue(this.helperService.formatAmount(this.dataService.sendAmount, 1, 6), { emitEvent: true });
	}

	submit() {
		if (this.transfer.valid) {
			this.getDialogService().openTransferDialog (
				this.transfer.value.amountFormControl,
				this.transfer.value.walletFormControl,
				this.transfer.value.toaddressFormControl,
				this.transfer.value?.messageFormControl,
			)
		}
		else if (this.pay.valid) {
			this.getDialogService().openTransferDialog (
				this.pay.value.amountFormControl,
				this.pay.value.walletFormControl,
				this.pay.value.toaddressFormControl,
				this.pay.value?.messageFormControl,
				this.pay.value?.paymentidFormControl,
			)
		}
		else {
			this.getHelperService().createSnackbar('Issues detected, please review selection.')
		}
	}

	ngOnInit(): void {
		this.dataService.isLoggedIn = this.authService.loggedIn();
		this.helperService.getMarket();
		this.helperService.getWallets();
		this.helperService.getContacts();
		this.helperService.checkFor2FA();
		this.transfer.reset();
		this.pay.reset();
		this.dataService.sendAmount = 0;
		if (this.dataService.selectedWallet) {
			this.transfer.controls.walletFormControl.patchValue(this.dataService.selectedWallet, { emitEvent: true });
			this.pay.controls.walletFormControl.patchValue(this.dataService.selectedWallet, { emitEvent: true });
		}
		if (this.dataService.sendToWallet) {
			this.pay.controls.toaddressFormControl.patchValue(this.dataService.sendToWallet, { emitEvent: true });
			this.pay.controls.paymentidFormControl.patchValue(this.dataService.sendToPAymentID, { emitEvent: true });
		}
	}

	// custom validator
	private matches(control: FormControl): { [s: string]: boolean } {
		if (this.transfer && (control.value == this.transfer.controls.walletFormControl.value)) {
			return { match: true };
		}
		if (this.pay && (control.value == this.pay.controls.walletFormControl.value)) {
			return { match: true };
		}
		return null;
	}

}