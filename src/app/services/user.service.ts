import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/requests/user';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private baseUrl: string = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  get(id: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/${id}`;

    return this.http.get(url, options).catch((error: any) => Observable.throw(error.json().error) || 'An error occured');
  }

  create(body: Object): Observable<User> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };

    return this.http.post(this.baseUrl, body, options)
                    .catch((error: any) => Observable.throw(error.json().error) || 'An error occured');
  }

  updateEmail(body: Object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/email`;

    return this.http.post(url, body, options)
                    .catch((error: any) => Observable.throw(error.json().error) || 'An error occured');
  }

  update(id: string, body: Object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    let url = `${this.baseUrl}/${id}`;

    return this.http.put(url, body, options)
                    .catch((error: any) => Observable.throw(error.json().error) || 'An error occured');
  }

  validate(id: String, token: String, password: String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: headers };
    const body = {
      password: password
    }
    const url = `${this.baseUrl}/${id}/validate?token=${token}`;

    return this.http.post(url, body, options)
                    .catch((error: any) => Observable.throw(error.json().error) || 'An error occured');
  }
}
