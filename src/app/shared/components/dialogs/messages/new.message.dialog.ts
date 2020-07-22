// Angular Core
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-message',
  templateUrl: './new.message.dialog.html',
  styleUrls: ['./new.message.dialog.scss'],
})
export class NewMessageDialog {

  constructor(
    public dialogRef: MatDialogRef<NewMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}