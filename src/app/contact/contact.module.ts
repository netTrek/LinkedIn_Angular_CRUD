import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { MapComponent } from './contact/map/map.component';
import { FormComponent } from './contact/form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyValidatorsModule } from '../my-validators/my-validators.module';
import { MyValueAccessorsModule } from '../my-value-accessors/my-value-accessors.module';

const routes: Routes = [
  {
    path: '', component: ContactComponent, children: [
      { path: '', redirectTo: 'form', pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'form', component: FormComponent }
    ]
  }
];

@NgModule ( {
  imports     : [
    CommonModule,
    FormsModule,
    MyValidatorsModule,
    MyValueAccessorsModule,
    RouterModule.forChild ( routes )
  ],
  declarations: [ ContactComponent,
                  MapComponent,
                  FormComponent
  ],
  exports     : [ ContactComponent ]
} )
export class ContactModule {
}
