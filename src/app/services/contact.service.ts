import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

import { Contact } from '../models/data/contact';

interface ContactResponse {
  data: Contact;
}

@Injectable()
export class ContactService {

  baseUrl: string = environment.apiUrl + 'contacts';
  
  constructor(private http: HttpClient) { }

  add(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ContactResponse>(this.baseUrl, body, { headers })
  }

  addPerson(id: string, body: object) {
  }

  addToGroup(id: string, contacts: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/groups/${id}/bulk`;
    
    return this.http.post<any>(url, { contacts }, { headers })
  }

  get(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    Object.keys(options).forEach(key => {
      params = params.append(key, options[key]);
    })
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<ContactResponse>(url, { headers, params })
  }

  invoices(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    const url = `${this.baseUrl}/${id}/invoices`;

    return this.http.get<any>(url, { headers, params });
  }

  people(id: string) {
  }

  update(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<ContactResponse>(url, body, { headers })
  }

  updateGroup(id: string, body: object) {
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url, { headers });
  }

  deleteMany(contacts: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/delete/bulk`;

    return this.http.post(url, { contacts }, { headers });
  }

  deletePerson(id: string) { 
  }

  deleteGroup(id: string) {
  }
}
