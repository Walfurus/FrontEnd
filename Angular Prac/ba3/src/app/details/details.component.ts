import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  display=true;
  i=0;
  click = '';
  clicks = [];

  constructor() { }

  ngOnInit(): void {

  }

  toggleDisplay() {
    this.display = !this.display;
    this.click = this.i++ + " " + Date() + '';
    this.clicks.push(this.click);
  }

}
