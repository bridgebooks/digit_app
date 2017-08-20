import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import { environment } from '../../environments/environment';
import { User } from '../models/responses/user';
import { LoginResponse } from '../models/responses/login';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

interface Response {
  status: string;
  message: string;
}

@Injectable()
export class AuthService {

  private baseUrl: string = environment.apiUrl + 'auth';

  constructor(private http: HttpClient) { }

  login(credentials: object) {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/login`;

    return this.http.post<LoginResponse>(url, credentials, { headers: headers });
  }

  logout() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/logout`;

    return this.http.post<Response>(url, {}, { headers: headers });
  }

  requestPasswordReset(body: object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/password/reset`;

    return this.http.post<Response>(url, body, { headers: headers });
  }

  resetPassword(body: object, token: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams().set('token', token);

    const url = `${this.baseUrl}/password/create`;

    return this.http.post<Response>(url, body, { headers: headers, params: params });
  }
}
