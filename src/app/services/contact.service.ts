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

  appPerson(id: string, body: object) {
  }

  get(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<ContactResponse>(url, { headers })
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
  }

  deletePerson(id: string) { 
  }

  deleteGroup(id: string) {
  }
}
