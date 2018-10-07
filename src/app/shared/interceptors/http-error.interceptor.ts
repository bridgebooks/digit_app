import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService, AlertService, EventbusService } from '../../services';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private eventbus: EventbusService,
        private session: SessionService,
        private alert: AlertService) {
        }

    private handleError(response: HttpErrorResponse, caught$: Observable<any>) {
        if ([400, 403].indexOf(response.status) !== -1 && response.error.message) {
            this.alert.error('Error', response.error.message, {
                timeOut: 5000
            });
        }

        if (response.status === 402) {
            this.eventbus.broadcast('billing:error', { message: response.error.message })
        }

        if (response.status === 426) {
            this.eventbus.broadcast('billing:error', { message: response.error.message })
        }

        if (response.status === 422) {
            this.alert.error('Error', 'Please check that you have entered the required information correctly', {
                timeOut: 5000
            })
        }

        if (response.status === 401) {
            this.session.end();
            this.alert.error('Session', 'Your session has expired, please login again', { timeOut: 3000 });
            this.router.navigate(['/login']);
        }

        if (response.status === 500) {
            this.alert.error('Error', 'An error occured on the server. We working to fix it, please try again later', { timeOut: 3000 });
        }

        return ErrorObservable.create(response);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'OPTIONS') {
            return next.handle(req)
                .pipe(
                    map(event => { return event; }),
                    catchError((err, caught$) => {
                        return this.handleError(err, caught$);
                    })
                )
        }

        return next.handle(req);
    }
}
