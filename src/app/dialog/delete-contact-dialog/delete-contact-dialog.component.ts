import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-contact-dialog',
  templateUrl: './delete-contact-dialog.component.html',
  styleUrls: ['./delete-contact-dialog.component.css']
})
export class DeleteContactDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteContactDialogComponent>) { }

  ngOnInit(): void {
  }
  closeModal(): void {
    this.dialogRef.close();
  }
  deleteContact() {
    this.dialogRef.close({isDelete: true });
  }
}
