import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() emitter = new EventEmitter<number>();
  delay;
  count = 0;

  constructor() { }

  ngOnInit() {

  }

  startGame() {
    this.delay = setInterval( ()=> {
      this.emitter.emit(this.count + 1);
      this.count++;
    }, 1000);
  }

  stopGame() {
    clearInterval(this.delay);
  }

}
