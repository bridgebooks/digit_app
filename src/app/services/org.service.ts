import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

import { OrgResponse } from '../models/responses/org';
import { ContactsResponse } from '../models/responses/contacts';
import { ItemsResponse } from '../models/responses/items';
import { AccountsResponse } from '../models/responses/accounts';
import { TaxRatesResponse } from '../models/responses/tax-rates';
import { Org } from '../models/data/org';
import { PayrunsResponse } from 'app/models/responses/payruns';

interface OrgCreateResponseData {
  org: any;
  user: any;
  token: string;
}

interface OrgCreateResponse {
  status: string;
  data: OrgCreateResponseData
}

interface ContactGroupsResponse {
  data: any[]
}

@Injectable()
export class OrgService {

  baseUrl: string = environment.apiUrl + 'orgs';

  constructor(private http: HttpClient) { }

  create(body: object): Observable<OrgCreateResponse> {
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };

    return this.http.post<OrgCreateResponse>(this.baseUrl, body, options)
  }

  addContactGroup(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/contact_groups`;

    return this.http.post<any>(url, body, { headers })
  }

  get(id: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('include', 'industry')
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<OrgResponse>(url, { 
      headers: headers,
      params: params
    })
  }

  getAccounts(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();    
    const url = `${this.baseUrl}/${id}/accounts`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<AccountsResponse>(url, { 
      headers: headers,
      params: params
    })
  }

  getTaxRates(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();    
    const url = `${this.baseUrl}/${id}/tax_rates`;
    
    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }
    return this.http.get<TaxRatesResponse>(url, { 
      headers: headers,
      params: params
    })
  }

  getContacts(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/contacts`;

    Object.keys(options).forEach(key => {
      params = params.append(key, options[key]);
    })

    return this.http.get<ContactsResponse>(url, { headers, params })
  }

  getContactGroups(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/contact_groups`;

    return this.http.get<ContactGroupsResponse>(url, { headers })
  }

  getEmployees(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/employees`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<any>(url, { headers, params })
  }

  getPayruns(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/payruns`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<PayrunsResponse>(url, { headers, params })
  }

  getItems(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/items`;

    Object.keys(options).forEach(key => {
      params = params.append(key, options[key]);
    })

    return this.http.get<ItemsResponse>(url, { headers, params })
  }

  getInvoiceEvents(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/invoice_events`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<any>(url, { headers, params })
  }

  getSaleInvoices(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/sales`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<any>(url, { headers, params })
  }

  getBills(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/bills`;

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<any>(url, { headers, params })
  }

  getInvoiceSettings(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/invoice_settings`;

    return this.http.get<any>(url, { headers })
  }

  getUsers(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/users`;

    return this.http.get<any>(url, { headers })
  }

  inviteUser(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/users/invite`;

    return this.http.post<any>(url, body, { headers })
  }

  updateInvoiceSettings(id: string, data: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    const url = `${this.baseUrl}/${id}/invoice_settings`;

    return this.http.put<any>(url, data, { headers })
  }

  update(id: string, body: object) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<OrgResponse>(url, body, { headers: headers })
  }
}
