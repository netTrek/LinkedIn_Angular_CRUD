import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../../../my-validators/my-validators';

@Component ( {
  selector   : 'in-form',
  templateUrl: './form.component.html',
  styleUrls  : [ './form.component.scss' ]
} )
export class FormComponent implements OnInit {

  myForm: FormGroup | FormArray;
  username: FormControl | AbstractControl;
  email: FormControl | AbstractControl;
  msg: FormControl | AbstractControl;
  personalInfo: FormGroup | AbstractControl;
  desired: AbstractControl;

  constructor( private fb: FormBuilder ) {
  }

  ngOnInit() {

    // this.username = new FormControl( '', [
    //   Validators.required, Validators.minLength ( 3 )
    // ] );
    // this.email = new FormControl( '', [
    //   Validators.required, Validators.email
    // ] );
    // this.msg = new FormControl( '' );
    //
    // this.personalInfo = new FormGroup( { name: this.username, email: this.email } );
    //
    // this.myForm = new FormGroup( {
    //   personalInfo: this.personalInfo, msg: this.msg } );

    this.myForm = this.fb.group ( {
      personalInfo: this.fb.group ( {
        name : [ '',
                 [ Validators.required,
                   Validators.minLength ( 3 )
                 ]
        ],
        email: [ '',
                 [ Validators.required,
                   Validators.email
                 ],
                 MyValidators.uniqueMail
        ]
      } ),
      desired     : [ null,
                      MyValidators.isFuture ( new Date ( 2018, 10, 4 ) )
      ],
      msg         : [ '' ]
    } );

    this.username     = this.myForm.get ( [ 'personalInfo',
                                            'name'
    ] );
    this.email        = this.myForm.get ( [ 'personalInfo',
                                            'email'
    ] );
    this.desired      = this.myForm.get ( [ 'desired' ] );
    this.msg          = this.myForm.get ( [ 'msg' ] );
    this.personalInfo = this.myForm.get ( [ 'personalInfo' ] );

  }

}
