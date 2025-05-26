import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersDeleteComponent } from './components/users-delete/users-delete.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersDeleteComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
