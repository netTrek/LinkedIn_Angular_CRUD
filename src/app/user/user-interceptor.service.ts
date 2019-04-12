import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

let reqCounter = 0;

@Injectable ( {
  providedIn: 'root'
} )
export class UserInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle ( req.clone ( {
      setParams: { Test: 'netTrek' }
    } ) )
               .pipe (
                 tap ( event => {
                     if ( event.type === HttpEventType.Sent ) {
                       reqCounter ++;
                       // console.log ( 'SENT::: current num of requests ' + reqCounter );
                     } else if ( event.type === HttpEventType.Response ) {
                       reqCounter --;
                       // console.log ( 'RESPONSE::: current num of requests ' + reqCounter );
                     }
                   },
                   err => {
                     reqCounter --;
                     // console.log ( 'ERROR::: current num of requests ' + reqCounter );
                   } )
               )
      ;
  }
}
