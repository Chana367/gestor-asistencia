import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { InscriptionsDeleteComponent } from './components/inscriptions-delete/inscriptions-delete.component';
import { InscriptionsFormComponent } from './components/inscriptions-form/inscriptions-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsComponent } from './inscriptions.component';


@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionsTableComponent,
    InscriptionsDeleteComponent,
    InscriptionsFormComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule
  ]
})
export class InscriptionsModule { }
