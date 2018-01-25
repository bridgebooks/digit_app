import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocalStorageModule } from 'angular-2-local-storage';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpCacheInterceptor, HttpErrorInterceptor, JwtInterceptor } from './shared';
import { JwtHelper } from './shared/utils/jwt';
import { AlertService, SessionService, JwtService, HttpCacheService, EventbusService } from './services';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
      prefix: 'bb',
      storageType: 'localStorage'
    }),
    SimpleNotificationsModule.forRoot(),
    SharedModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AlertService,
    // { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },    
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    Title,
    JwtHelper,
    SessionService,
    JwtService,
    HttpCacheService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
