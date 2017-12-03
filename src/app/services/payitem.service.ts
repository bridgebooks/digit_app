import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PayitemResponse } from 'app/models/responses/payitem';

@Injectable()
export class PayitemService {
  
  baseUrl: string = environment.apiUrl + 'payitems'; 

  constructor(private http: HttpClient) { }

  create(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<PayitemResponse>(this.baseUrl, body, { headers })
  }

  get(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<PayitemResponse>(url, { headers, params })
  }

  update(id: string, body: object, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.put<PayitemResponse>(url, body, { headers, params })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, { headers });
  }
}
