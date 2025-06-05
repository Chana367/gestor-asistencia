import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDeleteComponent } from './components/courses-delete/courses-delete.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';
import { StoreModule } from '@ngrx/store';
import { coursesFeature } from './store/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDeleteComponent,
    CoursesTableComponent,
    CoursesFormComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects]),
  ]
})
export class CoursesModule { }
