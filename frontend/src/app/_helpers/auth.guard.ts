import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const account = this.accountService.accountValue;
    if (account) {
      //check if route is restricted by roles
      if (route.data['roles'] && !route.data['roles'].includes(account.role)) {
        return this.router.createUrlTree(['/']);
      }

      // authorised so return true
      return true;
    }

    return this.router.createUrlTree(['/account/login'], { queryParams: { returnUrl: state.url } });
  }
}