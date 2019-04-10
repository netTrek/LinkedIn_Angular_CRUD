import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureDirective } from './future.directive';
import { UniqueMailDirective } from './unique-mail.directive';

@NgModule ( {
  declarations: [ FutureDirective,
                  UniqueMailDirective
  ],
  imports     : [
    CommonModule
  ],
  exports     : [ FutureDirective,
                  UniqueMailDirective
  ]
} )
export class MyValidatorsModule {
}
