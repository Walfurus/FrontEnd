import { AccountsService } from './../account.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private loggingService: LoggingService, private AccountsService: AccountsService) {

  }

  onSetTo(status: string) {
    this.AccountsService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.AccountsService.statusUpdated.emit(status);
  }
}
