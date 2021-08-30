import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
  <h1>Main Layout </h1>
  <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class MainLayoutComponent {
  constructor() {}
}
