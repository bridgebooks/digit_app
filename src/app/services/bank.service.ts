import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Bank {
  id: string;
  name: string;
  identifier: string,
  country: string
}

interface BanksResponse {
  data: Array<Bank>
}

@Injectable()
export class BankService {

  private baseUrl: string = environment.apiUrl + 'banks';

  constructor(private http: HttpClient) { }

  all(): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = { headers: headers };
  
      return this.http.get<BanksResponse>(this.baseUrl, options)
  }
}
