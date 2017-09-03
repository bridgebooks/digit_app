import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

import { OrgResponse } from '../models/responses/org';
import { ContactsResponse } from '../models/responses/contacts';
import { Org } from '../models/data/org';

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
    //const params = new HttpParams().set('include', 'industry')
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
    //const params = new HttpParams().set('include', 'industry')
    const url = `${this.baseUrl}/${id}/contact_groups`;

    return this.http.get<ContactGroupsResponse>(url, { headers })
  }

  update(id: string, body: object) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<OrgResponse>(url, body, { headers: headers })
  }
}
