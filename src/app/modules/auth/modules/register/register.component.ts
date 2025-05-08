import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterReadyComponent } from '../../components/register-ready/register-ready.component';

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

  constructor() {
    this.storage = window.localStorage;
  }

  private storage: Storage;

  onRegister() {
    if (this.username && this.password) {
      // Obtener la lista de usuarios del almacenamiento local
      const users = JSON.parse(this.storage.getItem('users') || '[]');
      // Verificar si el usuario ya existe
      const userExists = users.some((user: { username: string }) => user.username === this.username);
      if (userExists) {
        this.errorMessage = 'El usuario ya existe';
      } else {
        // Agregar el nuevo usuario al array
        users.push({ username: this.username, password: this.password });
        // Guardar el array actualizado en el almacenamiento local
        this.storage.setItem('users', JSON.stringify(users));
        // Registro exitoso
        console.log('Registro exitoso');
        this.registerSuccess();
      }
    } else {
      // Simulación de error de registro
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
