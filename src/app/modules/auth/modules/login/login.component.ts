import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user-credentials.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: UserCredentials[] = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' }]

  constructor(private router: Router) {
    // Cargar los usuarios desde el almacenamiento local al inicializar el componente
    this.users = [...this.users, ...JSON.parse(localStorage.getItem('users') || '[]')]
  }
  
  onLogin() {
    if (this.username && this.password) {
      // Verificar si el usuario existe en el almacenamiento local
      const user = this.users.find((user: UserCredentials) => user.username === this.username && user.password === this.password);
      if (user) {
        // Guardar el usuario en el almacenamiento local
        localStorage.setItem('userCurrent', JSON.stringify(user));
        // Redirigir a la página de inicio o a otra página según sea necesario
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    }
  }
}
