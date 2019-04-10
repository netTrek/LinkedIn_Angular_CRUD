import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerialDirective } from './serial.directive';

@NgModule ( {
  declarations: [ SerialDirective ],
  imports     : [
    CommonModule
  ],
  exports     : [ SerialDirective ]
} )
export class MyValueAccessorsModule {
}
