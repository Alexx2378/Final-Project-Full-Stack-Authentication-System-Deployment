import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accountSubject: BehaviorSubject<Account | null>;
  public account$: Observable<Account | null>;
  private refreshTokenTimeout?: number;

  constructor(private http: HttpClient) {
    const account = localStorage.getItem('account');
    this.accountSubject = new BehaviorSubject<Account | null>(account ? JSON.parse(account) : null);
    this.account$ = this.accountSubject.asObservable();
    this.startRefreshTokenTimer();
  }

  public get accountValue(): Account | null {
    return this.accountSubject.value;
  }

  login(email: string, password: string): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}/accounts/authenticate`, { email, password })
      .pipe(map(account => {
        this.setAccount(account);
        return account;
      }));
  }

  logout() {
    this.http.post(`${environment.apiUrl}/accounts/revoke-token`, {}).subscribe();
    this.stopRefreshTokenTimer();
    localStorage.removeItem('account');
    this.accountSubject.next(null);
  }

  refreshToken(): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}/accounts/refresh-token`, {})
      .pipe(map(account => {
        this.setAccount(account);
        return account;
      }));
  }

  register(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/accounts/register`, params);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/accounts/verify-email`, { token });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/accounts/forgot-password`, { email });
  }

  validateResetToken(token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/accounts/validate-reset-token`, { token });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/accounts/reset-password`, { token, password });
  }

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts`);
  }

  getById(id: string | number): Observable<Account> {
    return this.http.get<Account>(`${environment.apiUrl}/accounts/${id}`);
  }

  create(params: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/accounts`, params);
  }

  update(id: string | number, params: any): Observable<Account> {
    return this.http.put<Account>(`${environment.apiUrl}/accounts/${id}`, params)
      .pipe(map(account => {
        if (this.accountValue && account.id === this.accountValue.id) {
          account.jwtToken = this.accountValue.jwtToken;
          this.setAccount(account);
        }
        return account;
      }));
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/accounts/${id}`)
      .pipe(map(x => {
        if (this.accountValue && this.accountValue.id?.toString() === id.toString()) {
          this.logout();
        }
        return x;
      }));
  }

  private setAccount(account: Account) {
    this.accountSubject.next(account);
    localStorage.setItem('account', JSON.stringify(account));
    this.startRefreshTokenTimer();
  }

  private startRefreshTokenTimer() {
    this.stopRefreshTokenTimer();
    const account = this.accountValue;
    if (!account?.jwtToken) return;

    const jwtToken = JSON.parse(atob(account.jwtToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);

    this.refreshTokenTimeout = window.setTimeout(() => {
      this.refreshToken().subscribe();
    }, Math.max(timeout, 0));
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      window.clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = undefined;
    }
  }
}