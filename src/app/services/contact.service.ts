import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {

  baseUrl: string = environment.apiUrl + 'orgs';
  
  constructor(private http: HttpClient) { }

  add(id: string) {
  }

  appPerson(id: string, body: object) {
  }

  get(id: string) {
  }

  people(id: string) {
  }

  update(id: string, body: object) {
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
