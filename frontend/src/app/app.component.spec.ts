/// <reference types="jasmine" />

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { AppComponent } from './app.component';
import { Account } from '@app/_models';
import { AccountService } from '@app/_services';

describe('AppComponent', () => {
  beforeEach(async () => {
    const accountSubject = new BehaviorSubject<Account | null>(null);
    const accountServiceStub = {
      account$: accountSubject.asObservable(),
      accountValue: null,
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AccountService, useValue: accountServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture).toBeTruthy();
  });
});
