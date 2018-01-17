import { Injectable } from '@angular/core';
import { 
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpErrorResponse 
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SessionService, AlertService, EventbusService } from '../../services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router, 
        private eventbus: EventbusService,
        private session: SessionService, 
        private alert: AlertService) { 
        }

    private handleError(response: HttpErrorResponse) {
        if ([400, 403].indexOf(response.status) !== -1 && response.error.message) {
            this.alert.error('Error', response.error.message, {
                timeOut: 5000
            });
        }

        if (response.status === 402) {
            this.eventbus.broadcast('billing:error', { message: response.error.message })
        }

        if (response.status === 401) {
            this.session.end();
            this.alert.error('Session', 'Your session has expired, please login again', { timeOut: 3000 });
            this.router.navigate(['/login']);
        }

        if (response.status === 500) {
            this.alert.error('Error', 'An error occured on the server. We working it fix it, please try again later', { timeOut: 3000 });
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