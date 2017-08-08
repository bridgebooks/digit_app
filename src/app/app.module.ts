import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { LocalStorageModule } from 'angular-2-local-storage';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpErrorInterceptor, JwtInterceptor } from './shared';

import { AlertService, JwtService } from './services';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
      prefix: 'zb',
      storageType: 'localStorage'
    }),
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    Title,
    JwtHelper, 
    JwtService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
