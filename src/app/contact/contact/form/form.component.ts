import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component ( {
  selector   : 'in-form',
  templateUrl: './form.component.html',
  styleUrls  : [ './form.component.scss' ]
} )
export class FormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild ( NgForm )
  ngForm: NgForm;

  @ViewChild ( 'username' )
  username: NgModel;

  startValue = 'Peter Müller';

  searchstring: '';

  private formSub: Subscription;
  private userSub: Subscription;
  private userSub2: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // console.log(this.ngForm.value);
    // console.log(this.username.value);
    this.userSub  = this.username.valueChanges.subscribe (
      next => {
        // console.log('new username', next);
      }
    );
    this.formSub  = this.ngForm.valueChanges.subscribe (
      next => {
        // console.log('form updated', next);
      }
    );
    this.userSub2 = this.username.statusChanges.subscribe (
      next => {
        // console.log('statusChanges', next, this.username.errors);

      }
    );
  }

  usernameChanged( currentname: string ) {
    // console.log('currentname', currentname);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe ();
    this.userSub2.unsubscribe ();
    this.formSub.unsubscribe ();
  }

  updateName() {
    this.username.control.setValue ( 'neuer wert', {
      emitEvent            : true,
      emitViewToModelChange: true,
      emitModelToViewChange: true
    } );
  }

  send( formData: any ) {
    console.log ( formData, this.ngForm.value );
    // this.ngForm.reset( { personalInfo: { email: 'saban@uenlue.de'} } );
    // this.ngForm.control.reset( { personalInfo: { email: 'saban@uenlue.de'} }, {
    //   onlySelf: false, emitEvent: false
    // } );
  }

  reset() {
    // console.log ( 'reset' );
  }

}
