import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireStateFacade } from 'src/app/services/firecache.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private fires: FireStateFacade,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async routeToStaff() {
    await this.router.navigate(['main/staff/view'])
  }

  async routeToClient() {
    await this.router.navigate(['main/client/view'])
  }

  async logout() {
    try {
      await this.fires.app.appSDK.auth().signOut();
      await this.router.navigate(['../auth/login'])
    } catch (e) {
      throw(e);
    }
    
  }
}
