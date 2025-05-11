import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home-dashboard/home-dashboard.module').then(m => m.HomeDashboardModule),
      },
      {
        path: 'students',
        loadChildren: () => import('./modules/students/students.module').then(m => m.StudentsModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('./modules/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'inscriptions',
        loadChildren: () => import('./modules/inscriptions/inscriptions.module').then(m => m.InscriptionsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
