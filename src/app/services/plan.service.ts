import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SubscriptionPlan } from '../models/data/subscription-plan';

interface PlansResponse {
  data: SubscriptionPlan[]
}

@Injectable()
export class PlanService {
  baseUrl: string = environment.apiUrl + 'plans';
  
  constructor(private http: HttpClient) { }

  all() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<PlansResponse>(this.baseUrl, { headers })
  }
}
