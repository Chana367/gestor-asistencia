import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../../core/models';

export interface UserFormData {
  user: User | null;
}

@Component({
  selector: 'app-users-form',
  standalone: false,
  templateUrl: './users-form.component.html',
  styles: ``
})
export class UsersFormComponent {
  userForm: FormGroup;
  @Input()
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormData
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      token: ['']
    });

    if (this.data?.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.dialogRef.close(newUser);
    } else {
      console.error('Formulario inválido');
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}