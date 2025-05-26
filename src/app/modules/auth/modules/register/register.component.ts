import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterReadyComponent } from '../../components/register-ready/register-ready.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  readonly dialog = inject(MatDialog);

  constructor(private authService: AuthService) { }


  onRegister() {
    if (this.username && this.password) {
      this.authService.register(this.username, this.password)
        .pipe()
        .subscribe({
          next: (result) => {
            if (result.success) {
              this.registerSuccess();
            } else {
              this.errorMessage = result.message;
            }
          },
          error: (err) => {
            this.errorMessage = 'Ocurrió un error durante el registro';
          }
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos';
    }
  }

  registerSuccess() {
    this.dialog.open(RegisterReadyComponent, {
      width: '60vw',
      height: 'auto',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
    });
  }
}
