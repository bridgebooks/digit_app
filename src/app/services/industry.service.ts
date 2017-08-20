import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Industry {
  id: string;
  name: string;
}

interface IndustriesResponse {
  data: Array<Industry>
}

@Injectable()
export class IndustryService {

  private baseUrl: string = environment.apiUrl + 'industries';

  constructor(private http: HttpClient) { }

  all(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };

    return this.http.get<IndustriesResponse>(this.baseUrl, options);
  }
}
