import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="background">
      <div class="container">
        <router-outlet> </router-outlet>
      </div>
    </div>
  `,
  styles: [`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  .background,.container {
    height: 100%;
  }

  `],
})
export class AuthLayoutComponent {
  constructor() {}
}
