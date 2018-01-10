import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PayrunResponse } from '../models/responses/payrun';

@Injectable()
export class PayrunService {

  baseUrl: string = environment.apiUrl + 'payruns';

  constructor(private http: HttpClient) { }

  create(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<PayrunResponse>(this.baseUrl, body, { headers })
  }

  approve(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/approve`;

    return this.http.put<PayrunResponse>(url, body, { headers});
  }

  send(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/slips/send`;

    return this.http.post<any>(url, {}, { headers});
  }

  get(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<PayrunResponse>(url, { headers, params })
  }

  delete(id: string) {
  }
}
