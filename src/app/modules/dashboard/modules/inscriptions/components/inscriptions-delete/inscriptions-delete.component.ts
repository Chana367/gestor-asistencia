import { Component, Inject } from '@angular/core';
import { StudentsDeleteComponent } from '../../../students/components/students-delete/students-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscriptions-delete',
  standalone: false,
  templateUrl: './inscriptions-delete.component.html',
  styles: ``
})
export class InscriptionsDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentsDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Devuelve `true` al confirmar
  }

  onCancel(): void {
    this.dialogRef.close(false); // Devuelve `false` al cancelar
  }
}
