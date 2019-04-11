import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';

@Component ( {
  selector   : 'in-user-details',
  templateUrl: './user-details.component.html',
  styleUrls  : [ './user-details.component.scss' ]
} )
export class UserDetailsComponent implements OnInit, OnDestroy {

  user: User;
  private sub: Subscription;
  private updateSub: Subscription;

  constructor( private router: Router, private route: ActivatedRoute, private $user: UserService ) {
  }

  ngOnInit() {
    this.sub = this.route.data.subscribe ( next => this.user = next.user as User );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe ();
    if ( !!this.updateSub ) {
      this.updateSub.unsubscribe ();
    }
  }


  editUser() {
    this.updateSub = this.$user.updated
                         .pipe( first() )
                         .subscribe( user => this.user = user );
    this.router.navigate ( [ { outlets: { modal: [ 'editUser', this.user.id ] } } ] );
  }

}
