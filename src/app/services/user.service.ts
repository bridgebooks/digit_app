import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/requests/user';
import { ValidateResponse } from '../models/responses/user-validate';
import { GenericResponse } from '../models/responses/generic';
import { GenericDataResponse } from '../models/responses/generic-data';
import { BillResponse } from '../models/responses/billing';

@Injectable()
export class UserService {

  private baseUrl: string = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  get(id: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/${id}`;

    return this.http.get<any>(url, options)
  }

  getBilling(options?: object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    let url = `${this.baseUrl}/billing`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<BillResponse>(url, { headers, params });
  }

  newSubscription(body: object, options?: object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    let url = `${this.baseUrl}/billing/subscriptions`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }
    
    return this.http.post<any>(url, body, { headers, params });
  }

  cancelSubscription(options?: object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    let url = `${this.baseUrl}/billing/subscriptions/cancel`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }
    
    return this.http.post<any>(url, {}, { headers, params });
  }

  create(body: Object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };

    return this.http.post(this.baseUrl, body, options);
  }

  updateEmail(body: Object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/email`;

    return this.http.post<any>(url, body, options)
  }

  updatePassword(body: Object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/password`;

    return this.http.post<GenericResponse>(url, body, options)
  }

  update(id: string, body: Object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/${id}`;

    return this.http.put<GenericDataResponse>(url, body, options)
  }

  validate(id: String, body: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
   
    const url = `${this.baseUrl}/${id}/validate?token=${body.token}`;

    return this.http.post<ValidateResponse>(url, body, options)
  }
}
