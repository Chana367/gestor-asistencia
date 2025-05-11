import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule, MatInputModule,
    MatTableModule, MatSelectModule,
    MatDialogModule, MatInputModule,
    MatIconModule, MatButtonModule,
    MatCardModule, MatToolbarModule,
    MatListModule, MatSidenavModule,
    MatOptionModule, MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
