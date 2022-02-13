import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req: any, next: any) {

    let indexedService = this.injector.get(IndexedDBService)

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${indexedService.getToken()}`


      }

    })
    return next.handle(tokenizedReq)
  }
}
