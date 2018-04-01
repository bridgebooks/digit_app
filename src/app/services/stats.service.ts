import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class StatsService {
  baseUrl: string = environment.apiUrl + 'stats';

  constructor(private http: HttpClient) { }

  invoices(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/sales`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<any>(url, { headers, params })
  }
}
