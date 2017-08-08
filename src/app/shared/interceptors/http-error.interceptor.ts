import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AlertService } from '../../services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertService) { }

    private handleError(response: HttpErrorResponse) {
        if ([400, 403].indexOf(response.status) !== -1 && response.error.message) {
            this.alertService.error('Error', response.error.message, {
                timeOut: 5000
            });
        }
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'OPTIONS') {
            return next.handle(req)
                .map(event => { return event; })
                .catch(err => {
                    this.handleError(err);
                    return Observable.throw(err);
                })
        }

        return next.handle(req);
    }
}