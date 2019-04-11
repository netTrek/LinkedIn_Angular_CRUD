import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs/internal/observable/of';

@Injectable ( {
  providedIn: 'root'
} )
export class UserService {

  list: BehaviorSubject<User[]> = new BehaviorSubject ( [] );
  updated: Subject<User>        = new Subject ();

  loggedIn = true;

  constructor( private http: HttpClient ) {
  }

  getUserByName( name: string ): User | undefined {
    return this.list.getValue ()
               .find ( value => {
                 return `${value.firstname} ${value.lastname}` === name;
               } );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]> ( environment.userEndpoint )
               .pipe (
                 map ( value => {
                   throw ( new Error ('ups ... so nicht!') );
                   return value;
                 }),
                 catchError( err => {
                   if ( err instanceof HttpErrorResponse ) {
                     console.log ( 'Serverseitiger Fehler' );
                   } else {
                     console.log ( 'Clientseitiger Fehler' );
                   }
                   return of ( [] );
                 }),
                 tap ( users => this.list.next ( users ),
                   err => {
                    console.log ( err );
                   } )
               );
  }

  getUserById( id: number ): Observable<User> {
    return this.http.get<User> ( `${environment.userEndpoint}/${id}` );
  }

  create( user: User ): Observable<User> {
    return this.http.post<User> ( environment.userEndpoint, user )
               .pipe (
                 tap ( createdUsr => this.getUsers ()
                                         .subscribe () )
               );
  }

  update( user: User ): Observable<User> {
    const headers: HttpHeaders = new HttpHeaders ( { TEST: 'netTrek' } );
    return this.http.put<User> ( `${environment.userEndpoint}/${user.id}`, user, { headers } )
               .pipe (
                 tap ( updatedUsr => this.updated.next ( updatedUsr ) )
               );
  }

  delete( user: User ): Observable<User> {
    return this.http.delete<User> ( `${environment.userEndpoint}/${user.id}` );
  }

}
