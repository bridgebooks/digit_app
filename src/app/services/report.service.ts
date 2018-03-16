import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SubscriptionPlan } from '../models/data/subscription-plan';
import { BalanceSheetReport } from '../models/responses/balance-sheet';
import { ProfitLossReport } from '../models/responses/profit-loss';

@Injectable()
export class ReportService {
  baseUrl: string = environment.apiUrl + 'reports';

  constructor(private http: HttpClient) { }

  balanceSheet(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/balance-sheet`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<BalanceSheetReport>(url, { headers, params })
  }

  profitLoss(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/profit-loss`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<ProfitLossReport>(url, { headers, params })
  }

  agedInvoices(id: string, options: object) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.baseUrl}/${id}/aged-invoices`;
    let params = new HttpParams();

    if (options) {
      Object.keys(options).forEach(key => {
        params = params.append(key, options[key]);
      })
    }

    return this.http.get<any>(url, { headers, params })
  }
}
