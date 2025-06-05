import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-ready',
  standalone: false,
  templateUrl: './register-ready.component.html',
  styles: ``
})
export class RegisterReadyComponent {

  constructor(private router: Router, public dialogRef: MatDialogRef<RegisterReadyComponent>) {}

  onConfirm() {
    // Redirigir a la página de inicio o a otra página según sea necesario
    this.router.navigate(['/auth/login']);
    this.dialogRef.close();
  }
}
