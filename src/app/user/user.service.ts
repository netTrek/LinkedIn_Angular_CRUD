import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { User } from './user';
import { first, switchMap } from 'rxjs/operators';

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

  constructor() {
  }

  getUserByName( name: string ): User | undefined {
    return this.data.find ( value => {
      return `${value.firstname} ${value.lastname}`  === name;
    } );
  }

  getUsers(): Observable<User[]> {
    return interval ( 250 )
      .pipe (
        first (),
        switchMap ( next => {
          return of ( this.data );
        } )
      );
  }

}
