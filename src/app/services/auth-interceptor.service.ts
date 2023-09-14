import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private firebase: FirebaseService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.firebase.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedRes = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedRes)
      })

    )
  }
}
