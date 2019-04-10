import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

export class MyValidators {
  static readonly isFuture: ( condition?: Date ) => ValidatorFn =
                    ( condition?: Date ): ValidatorFn => ( control: AbstractControl ): ValidationErrors | null => {
                      if ( control.value === null || control.value === '' ) {
                        return null;
                      }
                      const selected = new Date ( control.value );
                      const now      = !!condition ? condition : new Date ();
                      const isFuture = selected > now;
                      return !isFuture ? { 'future': { now, selected } } : null;
                    };

  static readonly uniqueMail: AsyncValidatorFn =
                    ( control: AbstractControl ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
                      return interval ( 500 )
                        .pipe ( first (),
                          map ( value => {
                            if ( control.value === null || control.value === '' ) {
                              return null;
                            }
                            if ( control.value.toString ()
                                        .toLowerCase ()
                                        .trim () === 'us@nettrek.de' ) {
                              return { 'uniqueMail': true };
                            }
                            return null;
                          } )
                        );
                    };
}
