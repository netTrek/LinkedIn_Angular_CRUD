import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { User } from './user';
import { first, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable ( {
  providedIn: 'root'
} )
export class UserService {

  private data: User[] = [
    { age: 12, firstname: 'Peter', lastname: 'Müller' },
    { age: 22, firstname: 'Frank', lastname: 'Müller' },
    { age: 33, firstname: 'Heike', lastname: 'Müller' },
    { age: 44, firstname: 'Saban', lastname: 'Ünlü' }
  ];

  loggedIn = true;

  constructor( private http: HttpClient ) {
  }

  getUserByName( name: string ): User | undefined {
    return this.data.find ( value => {
      return `${value.firstname} ${value.lastname}`  === name;
    } );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]> ( environment.userEndpoint )
      .pipe(
        tap( users => this.data = users )
      );
  }

  getUserById( id: number ): Observable<User> {
    return this.http.get<User>( `${environment.userEndpoint}/${id}`);
  }
}
