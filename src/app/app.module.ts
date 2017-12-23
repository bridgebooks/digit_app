import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocalStorageModule } from 'angular-2-local-storage';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpCacheInterceptor, HttpErrorInterceptor, JwtInterceptor } from './shared';

import { AlertService, SessionService, JwtService, HttpCacheService } from './services';

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
      prefix: 'bb',
      storageType: 'localStorage'
    }),
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AlertService,
    // { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },    
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    Title,
    SessionService,
    JwtService,
    HttpCacheService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
