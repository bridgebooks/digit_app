import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PayrunService {

  baseUrl: string = environment.apiUrl + 'payruns';

  constructor(private httpClient: HttpClient) { }

  create(body: object) {
  }

  update(id: string, body: object) {
  }

  get(id: string) {
  }

  delete(id: string) {
  }
}
