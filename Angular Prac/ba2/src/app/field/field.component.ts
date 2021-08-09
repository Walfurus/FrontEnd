import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  username = "";

  constructor() { }

  ngOnInit(): void {
  }

  deleteText(inputField) {
    this.username = inputField;
  }



}
