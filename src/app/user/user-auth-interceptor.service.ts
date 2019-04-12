import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable ( {
  providedIn: 'root'
} )
export class UserAuthInterceptorService implements HttpInterceptor {

  constructor( private user: UserService ) {
  }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if ( this.user.loggedIn && !!req.method.match ( /(^post$|^delete$|^put$)/i ) ) {
      req = req.clone({
        setHeaders: {authorization: 'Bearer netTrek'}
      });
    }
    return next.handle ( req );
  }
}
