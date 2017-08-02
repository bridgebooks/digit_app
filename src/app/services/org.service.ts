import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

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

    return this.http
      .post<OrgCreateResponse>(this.baseUrl, body, options)
      .catch((error: any) => Observable.throw(error.json().error) || 'An error occured');
  }
}
