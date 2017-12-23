import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployeesResponse } from '../models/responses/employees';
import { EmployeeResponse } from '../models/responses/employee';

@Injectable()
export class EmployeeService {

  baseUrl: string = environment.apiUrl + 'employees';
  
  constructor(private http: HttpClient) { }

  get(id: string, options?: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }
    
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<EmployeeResponse>(url, { headers, params })
  }

  add(body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<EmployeeResponse>(this.baseUrl, body, { headers })
  }

  update(id: string, body: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<EmployeeResponse>(url, body, { headers })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<any>(url, { headers })
  }

  archiveMany(employees: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/archive/bulk`;

    return this.http.post<any>(url, { employees }, { headers });
  }

  deleteMany(employees: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/delete/bulk`;

    return this.http.post<any>(url, { employees }, { headers });
  }

  restoreMany(employees: string[]) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/restore/bulk`;

    return this.http.post<any>(url, { employees }, { headers });
  }
}
