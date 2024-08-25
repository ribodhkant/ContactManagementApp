import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
imagePath:any;
 
  constructor() {
    this.imagePath = "../image/alogo.png";
  }

  ngOnInit() {
  }


}
