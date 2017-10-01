import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpCacheService } from '../../services';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

    constructor(private cache: HttpCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        HttpCacheService.setTTL(5);
        // Before doing anything, it's important to only cache GET requests.
        // Skip this interceptor if the request method isn't GET.
        if (['POST', 'PUT', 'DELETE'].indexOf(req.method) !== -1) {
            this.cache.invalidate();            
            return next.handle(req);
        }
   
        // First, check the cache to see if this request exists.
        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {
            // A cached response exists. Serve it instead of forwarding
            // the request to the next handler.
            const response = new HttpResponse({
                body: cachedResponse,
                url: req.url
            })

            return Observable.of(response)
        }
    
        // No cached response exists. Go to the network, and cache
        // the response when it arrives.
        return next.handle(req).do(event => {
            // Remember, there may be other events besides just the response.
            if (event instanceof HttpResponse) {
                // Update the cache.
                this.cache.put(req, event);
            }
        });
    }
}