import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNums: number[] = [];
  evenNums: number[] = [];

  intervalFired(fired: number) {
    if (fired % 2 === 0) {
      this.evenNums.push(fired);
    } else {
      this.oddNums.push(fired);
    }
  }
}
