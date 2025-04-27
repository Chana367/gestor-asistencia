import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-delete',
  standalone: false,
  templateUrl: './students-delete.component.html',
  styles: ``,
})
export class StudentsDeleteComponent {
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

