import { AccountsService } from './../account.service';
// import { LoggingService } from './../logging.service';
import { Component, EventEmitter, Output } from '@angular/core';

import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private AccountsService: AccountsService) {
    this.AccountsService.statusUpdated.subscribe(
      (status:string) => alert("New Status: " + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // console.log('A server status changed, new status: ' + accountStatus);
    // this.loggingService.logStatusChange(accountStatus);

    this.AccountsService.addAccount(accountName, accountStatus);

  }
  // const service = new LoggingService();
  // service.logStatusChange(accountStatus);
}
