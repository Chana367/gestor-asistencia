import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models/course.interface';

export interface CourseFormData {
  course: Course | null;
}

@Component({
  selector: 'app-courses-form',
  standalone: false,
  templateUrl: './courses-form.component.html',
  styles: ``
})
export class CoursesFormComponent {
  courseForm: FormGroup;
  @Input()
  course: Course | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CoursesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseFormData
  ) {
    this.course = this.data.course;

    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      hours: ['', [Validators.required, Validators.min(1)]],
    });

    if (this.course?.id) {
      this.courseForm.addControl('id', this.fb.control(this.course.id));
    }

    if (this.course) {
      this.courseForm.patchValue(this.course);
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      this.dialogRef.close(newCourse);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
