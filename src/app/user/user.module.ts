import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNameComponent } from './user/user-list/user-name/user-name.component';
import { UserListHeaderComponent } from './user/user-list/user-list-header/user-list-header.component';
import { UserListSubHeaderComponent } from './user/user-list/user-list-sub-header/user-list-sub-header.component';
import { UserListInfoComponent } from './user/user-list/user-list-info/user-list-info.component';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInterceptorService } from './user-interceptor.service';
import { UserAuthInterceptorService } from './user-auth-interceptor.service';

@NgModule ( {
  imports     : [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ UserComponent,
                  UserListComponent,
                  UserNameComponent,
                  UserListHeaderComponent,
                  UserListSubHeaderComponent,
                  UserListInfoComponent,
                  UserDetailsComponent,
                  UserFormComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: UserAuthInterceptorService, multi: true }
  ],
  exports     : [ UserComponent ]
} )
export class UserModule {
}
