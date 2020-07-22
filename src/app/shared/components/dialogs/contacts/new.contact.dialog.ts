// Angular Core
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new.contact.dialog.html',
  styleUrls: ['./new.contact.dialog.scss'],
})
export class NewContactDialog {

  constructor(
    public dialogRef: MatDialogRef<NewContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}