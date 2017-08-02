import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class JwtService {

  constructor(private localStorageService: LocalStorageService, private jwtHelper: JwtHelper) { 
    this.jwtHelper = new JwtHelper();
  }

  saveToken(token: string) {
    this.localStorageService.set('user.token', token);
  }

  readToken() {
    return this.localStorageService.get('user.token');
  }

  getToken() {
    if(!this.localStorageService.get('user.token')) {
      return null
    } else {
      let token = this.localStorageService.get('user.token') || 'null';
      return this.jwtHelper.decodeToken(token.toString());
    }
  }

  checkToken(): boolean {
    let token = this.localStorageService.get('user.token');
    let isExpired = this.isExpired();

    if (token && !isExpired)
      return true;
    else  
      return false;
  } 

  private isExpired() {
    let token = this.localStorageService.get('user.token');
    if(token) 
      return this.jwtHelper.isTokenExpired(token.toString());
    else
      return true;
  }
}
