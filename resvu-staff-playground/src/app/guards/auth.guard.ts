import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FireStateFacade } from '../services/firecache.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private fires: FireStateFacade, private router: Router) {}
  async canActivate(): Promise<boolean> {
    const uid = await this.fires.IsLoggedIn();
    const isLoggedIn = !!uid;
    console.log({uid});
    if (!isLoggedIn) {
      console.log('USER NOT LOGGED IN!');
      this.router.navigateByUrl('auth/login');
    }

    return isLoggedIn;
  }
}
