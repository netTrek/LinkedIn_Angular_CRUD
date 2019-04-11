import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
                 tap ( users => this.list.next ( users ),
                   err => {
                    console.log ( err );
                    alert ( 'Fehler');
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
