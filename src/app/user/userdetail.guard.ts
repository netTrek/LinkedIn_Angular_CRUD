import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

@Injectable ( {
  providedIn: 'root'
} )
export class UserdetailGuard implements Resolve<User> {

  constructor( private userService: UserService ) {
  }

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<User> | Promise<User> | User {
    const id: number = parseInt( route.paramMap.get ( 'id' ), 10 );
    // return this.userService.getUserByName ( name );
    return this.userService.getUserById ( id );
  }
}
