import { Component, EventEmitter, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.student = history.state.students || {};
    console.log('Data:', this.student);
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      const newStudent: Student = this.studentForm.value;
      this.dialogRef.close(newStudent);
    } else {
      console.log('Formulario inválido');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
