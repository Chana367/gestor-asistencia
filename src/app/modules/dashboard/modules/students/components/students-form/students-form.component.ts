import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

export interface StudentFormData {
  student: Student | null;
}

@Component({
  selector: 'app-students-form',
  standalone: false,
  templateUrl: './students-form.component.html',
  styles: ``
})
export class StudentsFormComponent {
  studentForm: FormGroup;
  @Input()
  student: Student | null = null;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<StudentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFormData) {
    
      this.student = this.data.student;
      this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      age: ['', [Validators.required, Validators.min(3), Validators.max(105), Validators.pattern(/^\d+$/)]],
    });

    if (this.student?.id) {
      this.studentForm.addControl('id', this.fb.control(this.student.id));
    }
    if (this.data?.student) {
      this.studentForm.patchValue(this.data.student);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      this.dialogRef.close(newStudent);
    } else {
      console.error('Formulario inválido');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
