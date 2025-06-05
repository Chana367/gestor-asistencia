import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../students/models';
import { Course } from '../../../courses/models/course.interface';
import { StudentsService } from '../../../students/services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscription } from '../../models/inscription.interface';

export interface InscriptionFormData {
  inscription: Inscription | null;
}

@Component({
  selector: 'app-inscriptions-form',
  standalone: false,
  templateUrl: './inscriptions-form.component.html',
  styles: ``
})
export class InscriptionsFormComponent {
  inscriptionForm: FormGroup;
  @Input()
  inscription: Inscription | null = null;
  students: Student[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    public dialogRef: MatDialogRef<InscriptionsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InscriptionFormData
  ) {
    this.inscriptionForm = this.fb.group({
      id_student: [this.data.inscription?.id_student || '', Validators.required],
      id_course: [this.data.inscription?.id_course || '', Validators.required],
      date_inscription: [this.data.inscription?.date_inscription || '', Validators.required],
    });

    if(this.inscription?.id){
      this.inscriptionForm.addControl('id', this.fb.control(this.data.inscription?.id || null));
    }
  }

  ngOnInit(): void {
    // Cargar estudiantes
    this.studentsService.getStudents$().subscribe((students) => {
      this.students = students;
    });

    // Cargar cursos
    this.coursesService.getCourses$().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      this.dialogRef.close(this.inscriptionForm.value); // Devuelve los datos del formulario
    }
  }

  onClose(): void {
    this.dialogRef.close("close"); // Cierra el diálogo sin devolver datos
  }
}
