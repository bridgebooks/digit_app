import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LocalStorageModule } from 'angular-2-local-storage';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { JwtInterceptor } from './shared';

import { JwtService } from './services';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LocalStorageModule.withConfig({
      prefix: 'zb',
      storageType: 'localStorage'
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    Title,
    JwtHelper, 
    JwtService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
