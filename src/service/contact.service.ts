import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public baseUrl: string = "https://localhost:7274/";
  constructor(@Inject(HttpClient) public http: HttpClient) { }
  
  getContactList() {
    let url_ = `${this.baseUrl}ContactManagement/GetContactList`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.get<any>(url_);
  }
  addUpdateContact(data: any) {
    let url_ = `${this.baseUrl}ContactManagement/InsertAndUpdateContact`;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.post<any>(url_, data);
  }
  deleteContact(id: any) {
    let url_ = `${this.baseUrl}ContactManagement/DeleteContact?id=` + id;
    url_ = url_.replace(/[?&]$/, "");
    return this.http.delete<any>(url_);
  }

}
