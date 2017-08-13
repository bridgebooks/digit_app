import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

import { OrgResponse } from '../models/responses/org';
import { Org } from '../models/data/org';

interface OrgCreateResponseData {
  org: any;
  token: string;
}

interface OrgCreateResponse {
  status: string;
  data: OrgCreateResponseData
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

  get(id: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('include', 'industry')
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<OrgResponse>(url, { 
      headers: headers,
      params: params
    })
  }

  update(id: string, body: object) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<OrgResponse>(url, body, { headers: headers })
  }
}
