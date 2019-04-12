import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule ( {
  imports     : [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [ HomeComponent ],
  exports     : [ HomeComponent ]
} )
export class HomeModule {
}
