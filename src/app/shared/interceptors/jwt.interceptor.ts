import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService) {
        console.log(this.jwtService.readToken());
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.jwtService.readToken()) {
            const request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.jwtService.readToken()}`
                }
            });

            return next.handle(request);
        } else {
            return next.handle(req);
        }
    }
}