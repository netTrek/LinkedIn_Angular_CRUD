import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyValidators } from './my-validators';

@Directive ( {
  selector : '[ngModel][inUniqueMail],[formControl][inUniqueMail],[formControlName][inUniqueMail]',
  providers: [
    {
      provide    : NG_ASYNC_VALIDATORS,
      useExisting: forwardRef ( () => UniqueMailDirective ),
      multi      : true
    }
  ]
} )

export class UniqueMailDirective implements AsyncValidator {

  constructor() {
  }

  validate( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return MyValidators.uniqueMail ( control );
  }
}
