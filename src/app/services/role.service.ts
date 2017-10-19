import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Roles } from '../models/responses/roles';

@Injectable()
export class RoleService {
  baseUrl: string = environment.apiUrl + 'roles';
  
  constructor(private http: HttpClient) { }

  orgRoles() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/orgs`;

    return this.http.get<Roles>(url, { headers })
  }
}
