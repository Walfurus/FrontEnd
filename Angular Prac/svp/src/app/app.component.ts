import { AccountsService } from './account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [AccountsService]
})
export class AppComponent {
  accounts: {name: string, status: string}[] = [];

  constructor(private AccountsService: AccountsService) {

  }

  ngOnInit() {
    this.accounts = this.AccountsService.accounts;
  }
}
