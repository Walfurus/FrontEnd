import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async routeToStaff() {
    await this.router.navigate(['main/staff/view'])
  }

  async routeToClient() {
    await this.router.navigate(['main/client/view'])
  }
}
