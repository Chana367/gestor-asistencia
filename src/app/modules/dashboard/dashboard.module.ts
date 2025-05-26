import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeDashboardComponent } from './modules/home-dashboard/home-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    HomeDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
