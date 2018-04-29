import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class PaymentsService {
  baseUrl: string = environment.apiUrl + 'payments';

  constructor(private http: HttpClient) { }

  receive(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/receive`;
    return this.http.post<any>(url, body, { headers })
  }
}
