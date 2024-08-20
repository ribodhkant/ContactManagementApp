import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/service/contact.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent implements OnInit {
  public ct_Id: number = 0;
  contactForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddContactDialogComponent>,
    private service: ContactService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    });
    if (this.data != null && this.data.id > 0) {
      this.ct_Id = this.data.id;
      this.contactForm.patchValue(this.data);
    }
    else {
    }
  }

  addContact() {
    if (this.contactForm.valid) {
      let formData = this.ct_Id > 0 ? this.data : this.contactForm.value;
      if(formData.id!=null && formData.id>0){
        formData.firstName = this.contactForm.value.firstName;
        formData.lastName = this.contactForm.value.lastName;
        formData.email = this.contactForm.value.email;
      }
      this.service.addUpdateContact(formData).subscribe((res: any) => {
        if (res.isSuccess) {
          this.toastr.success(res.massege, 'Success');
          this.dialogRef.close({ IsUpdated: res.isSuccess });
        }
        else {
          this.toastr.error('Something went wrong', 'Error');
        }
      })

    } else {
      this.toastr.error('User form is not valid!!', 'Error');
    }
  }
}
