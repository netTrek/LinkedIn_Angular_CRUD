import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../user/user.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component ( {
  selector   : 'in-home',
  templateUrl: './home.component.html',
  styleUrls  : [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit, OnDestroy {

  cookieAccepted = true;
  htmlString: string;
  imgSrc: SafeResourceUrl;

  private sub1: Subscription;
  private sub2: Subscription;

  constructor( private route: ActivatedRoute,
               public userService: UserService,
               private router: Router,
               private httpClient: HttpClient,
               private sanitizer: DomSanitizer ) {
  }

  ngOnInit() {

    // this.sub1 = this.route.params.subscribe( console.log );
    this.sub2 = this.route.paramMap.subscribe ( paramMap => {
      if ( paramMap.has ( 'test' ) ) {
        console.log ( 'habe test: ', paramMap.get ( 'test' ) );
      }
    } );

    this.httpClient.get( '/assets/data/html.txt',
      { responseType: 'text'} ).subscribe( txt => this.htmlString = txt );

    this.httpClient.get( 'http://localhost:3000/blob',
      { responseType: 'blob'} )
        .pipe(
          // tap ( blob => console.log ( blob) ),
          map ( blob => this.sanitizer.bypassSecurityTrustResourceUrl(
            window.URL.createObjectURL( blob )
          )),
          // tap ( url => console.log ( url) )
        )
        .subscribe( src => this.imgSrc = src );

  }

  ngOnDestroy(): void {
    // this.sub1.unsubscribe();
    this.sub2.unsubscribe ();
  }

  acceptCookie() {
    this.cookieAccepted = true;
  }

  openModal() {
    this.router.navigate ( [ { outlets: { modal: [ 'modalA' ] } } ] );
  }
}
