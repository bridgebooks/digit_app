import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/responses/search';

@Injectable()
export class SearchService {

  baseUrl: string = environment.apiUrl + 'search';

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>, params: object) {
    return terms
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term, params));
  }

  searchEntries(term: string, options: object) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams().set('search', term);
    
    Object.keys(options).forEach(key => {
      params = params.append(key, options[key]);
    })

    return this.http.get<SearchResponse>(this.baseUrl, { headers, params });
  }
}
