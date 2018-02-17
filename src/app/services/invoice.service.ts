import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InvoicePayment } from '../models/responses/invoice-payment';
import { VerifyPayment } from '../models/responses/verify-payment';

@Injectable()
export class InvoiceService {

  private baseUrl: string = environment.apiUrl + 'invoices';
  
  constructor(private http: HttpClient) { }

  create(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl, body, { headers });
  }

  send(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/send`;
    return this.http.post<any>(url, body, { headers });
  }

  initPayment(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/payment`;

    return this.http.post<InvoicePayment>(url, body, { headers });
  }

  verifyPayment(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/verify_payment`;

    return this.http.post<VerifyPayment>(url, body, { headers });
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

    return this.http.get<any>(url, { headers, params })
  }

  getPayment(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    const url = `${this.baseUrl}/payments/${id}`;

    return this.http.get<any>(url, { headers, params })
  }

  download(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.baseUrl}/${id}/download`;

    return this.http.post<any>(url, {});
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

    return this.http.put<any>(url, body, { headers, params })
  }

  updateItem(id: string, body: object, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/items/${id}`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.put<any>(url, body, { headers, params })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<any>(url, { headers });
  }

  deleteItem(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/items/${id}`;

    return this.http.delete<any>(url, { headers });
  }
}
