import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account, Role } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  account?: Account | null;
  Role = Role;

  private accountSubscription?: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountSubscription = this.accountService.account$.subscribe(x => this.account = x);
  }

  ngOnDestroy() {
    this.accountSubscription?.unsubscribe();
  }

  logout() {
    this.accountService.logout();
  }
}
