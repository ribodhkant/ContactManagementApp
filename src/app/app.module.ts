import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './component/contact/contact.component';
import { AddContactDialogComponent } from './dialog/add-contact-dialog/add-contact-dialog.component';
import { ContactService } from 'src/service/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import { DeleteContactDialogComponent } from './dialog/delete-contact-dialog/delete-contact-dialog.component';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [AppComponent, ContactComponent, AddContactDialogComponent, DeleteContactDialogComponent,FilterPipe],
  imports: [BrowserModule,AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'Total', // Footer total message
        selectedMessage: '' // Footer selected message
      }
    }),
    ToastrModule.forRoot({
      // positionClass :'toast-bottom-right'
    })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
