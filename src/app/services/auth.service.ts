import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';
import { User } from '../models/responses/user';
import { LoginResponse } from '../models/responses/login';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private baseUrl: string = environment.apiUrl + 'auth';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  addUser(user: User) {
    return this.localStorageService.set('user.data', user);
  }

  getUser() {
    return this.localStorageService.get('user.data');
  }

  login(credentials: object) {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/login`;

    return this.http.post<LoginResponse>(url, credentials, { headers: headers })
  }
}
