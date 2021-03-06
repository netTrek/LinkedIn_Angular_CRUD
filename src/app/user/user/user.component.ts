import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component ( {
  selector   : 'in-user',
  templateUrl: './user.component.html',
  styleUrls  : [ './user.component.scss' ]
} )
export class UserComponent implements OnInit, OnDestroy {

  userlist: User[] = [];
  header: string;
  description: string;
  subheader: string;

  private sub: Subscription;

  constructor( private router: Router, private route: ActivatedRoute, public $user: UserService ) {
  }

  ngOnInit() {
    // this.sub1 = this.route.params.subscribe ( console.log );
    this.sub = this.route.data.subscribe ( data => {
      this.userlist    = data.userlist;
      this.header      = data.header;
      this.subheader   = data.subheader;
      this.description = data.description;
    } );
  }

  goHome() {
    // this.router.navigateByUrl( '/home' );
    this.router.navigate ( [ '/home',
                             { id: 4711, name: 'Peter Müller', test: 'hello wolrd' }
    ], {} );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe ();
  }

  addNewUser() {
    this.router.navigate ( [ { outlets: { modal: [ 'addUser' ] } } ] );
  }
}
