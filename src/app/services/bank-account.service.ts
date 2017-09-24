import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BankAccountsResponse } from '../models/responses/bank-accounts';
import { BankAccountResponse } from '../models/responses/bank-account';

@Injectable()
export class BankAccountService {

  private baseUrl: string = environment.apiUrl + 'orgs';
  
  constructor(private http: HttpClient) { }

  all(org_id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${org_id}/bank_accounts`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<BankAccountsResponse>(url, { headers, params })
  }

  create(org_id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${org_id}/bank_accounts`;

    return this.http.post<BankAccountResponse>(url, body, { headers })
  }

  update(org_id: string, id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${org_id}/bank_accounts/${id}`;

    return this.http.put<BankAccountResponse>(url, body, { headers })
  }

  delete(org_id: string, id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${org_id}/bank_accounts/${id}`;

    return this.http.delete<any>(url, { headers });
  }
}
