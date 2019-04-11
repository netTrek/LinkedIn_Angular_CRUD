import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user';
import { filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable ( {
  providedIn: 'root'
} )
export class UserService {

  // private data: User[] = [
  //   { age: 12, firstname: 'Peter', lastname: 'Müller' },
  //   { age: 22, firstname: 'Frank', lastname: 'Müller' },
  //   { age: 33, firstname: 'Heike', lastname: 'Müller' },
  //   { age: 44, firstname: 'Saban', lastname: 'Ünlü' }
  // ];

  list: BehaviorSubject<User[]>      = new BehaviorSubject ( [] );
  updated: Subject<User>      = new Subject ( );

  loggedIn = true;

  constructor( private http: HttpClient ) {
    // this.create( {firstname: 'peter', lastname: 'meier', age: 22 })
    //   .subscribe( createdUsr => console.log( createdUsr ) );
  }

  getUserByName( name: string ): User | undefined {
    return this.list.getValue ()
               .find ( value => {
                 return `${value.firstname} ${value.lastname}` === name;
               } );
  }

  getUsers(): Observable<User[]> {
    const params: HttpParams = new HttpParams().set( 'token', 'Saban Ünlü');
    return this.http.request<User[]>( 'get', environment.userEndpoint, {
      observe: 'events', responseType: 'json', reportProgress: true
    } )
               .pipe (
                 tap ( event => {
                   let eventName = '';
                   switch ( event.type ) {
                     case HttpEventType.Sent:
                       eventName = 'Sent';
                       break;
                     case HttpEventType.DownloadProgress:
                       eventName = 'DownloadProgress';
                       break;
                     case HttpEventType.UploadProgress:
                       eventName = 'UploadProgress';
                       break;
                     case HttpEventType.User:
                       eventName = 'User';
                       break;
                     case HttpEventType.Response:
                       eventName = 'Response';
                       break;
                     case HttpEventType.ResponseHeader:
                       eventName = 'ResponseHeader';
                       break;
                   }
                   console.log ( eventName, event );
                 } ),
                 filter ( value => value.type === HttpEventType.Response ),
                 map( value => (value as HttpResponse<User[]>).body ),
                 tap ( users => this.list.next( users ) )
               );
    // return this.http.get<User[]> ( environment.userEndpoint )
    //            .pipe (
    //              tap ( users => this.list.next( users ) )
    //            );
  }

  getUserById( id: number ): Observable<User> {
    return this.http.get<User> ( `${environment.userEndpoint}/${id}` );
  }

  create( user: User ): Observable<User> {
    // return this.http.post<User> ( environment.userEndpoint, user )
    return this.http.request<User>( 'post', environment.userEndpoint, {
      body: user
    } )
               .pipe (
                 tap ( createdUsr => this.getUsers ()
                                         .subscribe () )
               );
  }

  update( user: User ): Observable<User> {
    const headers: HttpHeaders = new HttpHeaders( { TEST: 'netTrek'} );
    return this.http.put<User> ( `${environment.userEndpoint}/${user.id}`, user, {headers}  )
               .pipe (
                 tap ( updatedUsr => this.updated.next( updatedUsr ) )
               );
  }

  delete( user: User ): Observable<User> {
    return this.http.delete<User> ( `${environment.userEndpoint}/${user.id}` );
  }


}
