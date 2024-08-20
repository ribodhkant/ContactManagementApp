import { Component, OnInit } from '@angular/core';
import { AddContactDialogComponent } from 'src/app/dialog/add-contact-dialog/add-contact-dialog.component';
import { ContactService } from 'src/service/contact.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { DeleteContactDialogComponent } from 'src/app/dialog/delete-contact-dialog/delete-contact-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],

})
export class ContactComponent implements OnInit {
  public contactList = [];
  loadingIndicator: boolean = false;
  reorderable: any;

  constructor(private contactService: ContactService, private dialogRef: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getContactList();
  }
  getContactList() {
    this.contactService.getContactList().subscribe((response) => {
      if (response.isSuccess && response.contactList.length > 0) {
        this.contactList = response.contactList;
      }
      else {
        this.contactList = [];
        this.toastr.error('Data not available', 'Error');
      }
    });
  }

  editContact(data: any) {
    if (!data) {
      let dialog = this.dialogRef.open(AddContactDialogComponent);
      dialog.afterClosed().subscribe((data) => {
        if (data.IsUpdated) {
          this.getContactList();
        }
      });
    }
    else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = data;
      let dialog = this.dialogRef.open(AddContactDialogComponent, dialogConfig);
      dialog.afterClosed().subscribe((data) => {
        if (data.IsUpdated) {
          this.getContactList();
        }
      });
    }
  }
  deleteContact(data: any) {
    if(data!=null)
      {
        let dialog = this.dialogRef.open(DeleteContactDialogComponent);
        dialog.afterClosed().subscribe((d) => {
          if (d.isDelete) {
            this.contactService.deleteContact(data.id).subscribe((response: any) => {
              if (response.isSuccess) {
                this.toastr.success(response.massege, "Success");
                this.getContactList();
              }
              else {
                this.toastr.error(response.massege, "Error");
              }
            });
          }
        });
      }

  }
}


