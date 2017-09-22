import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TaxRateResponse } from '../models/responses/tax-rate';

@Injectable()
export class TaxRateService {

  private baseUrl: string = environment.apiUrl + 'taxrates';
  
  constructor(private http: HttpClient) { }

  create(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<TaxRateResponse>(this.baseUrl, body, { headers })
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

    return this.http.get<TaxRateResponse>(url, { headers, params })
  }

  update(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<TaxRateResponse>(url, body, { headers })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, { headers });
  }

  deleteMany(rates: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/delete/bulk`;

    return this.http.post(url, { rates }, { headers });
  }
}
