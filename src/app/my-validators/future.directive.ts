import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MyValidators } from './my-validators';

@Directive ( {
  selector : '[ngModel][inFuture],[formControl][inFuture],[formControlName][inFuture]',
  providers: [
    {
      provide    : NG_VALIDATORS,
      useExisting: forwardRef ( () => FutureDirective ),
      multi      : true
    }
  ]
} )
export class FutureDirective implements Validator {

  private _inFuture: string;
  private _fn: () => void;

  constructor() {
  }

  get inFuture(): string {
    return this._inFuture;
  }

  @Input ()
  set inFuture( value: string ) {
    this._inFuture = value;
    if ( value !== '' && !!this._fn ) {
      this._fn ();
    }
  }

  validate( control: AbstractControl ): ValidationErrors | null {
    let date: Date;
    if ( this._inFuture !== '' ) {
      date = new Date ( this._inFuture );
    }
    return MyValidators.isFuture ( date ) ( control );
  }

  registerOnValidatorChange( fn: () => void ): void {
    this._fn = fn;
  }

}
