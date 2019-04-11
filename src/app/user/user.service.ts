import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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

  list: BehaviorSubject<User[]> = new BehaviorSubject([]);

  loggedIn = true;

  constructor( private http: HttpClient ) {
    // this.create( {firstname: 'peter', lastname: 'meier', age: 22 })
    //   .subscribe( createdUsr => console.log( createdUsr ) );
  }

  getUserByName( name: string ): User | undefined {
    return this.list.getValue().find ( value => {
      return `${value.firstname} ${value.lastname}` === name;
    } );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]> ( environment.userEndpoint )
               .pipe (
                 tap ( users => this.list.next( users ))
               );
  }

  getUserById( id: number ): Observable<User> {
    return this.http.get<User> ( `${environment.userEndpoint}/${id}` );
  }

  create( user: User ): Observable<User> {
    return this.http.post<User> ( environment.userEndpoint, user )
      .pipe(
        tap ( createdUsr => this.getUsers().subscribe() )
      );
  }
}
