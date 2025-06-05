import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../../core/models';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersDeleteComponent } from './components/users-delete/users-delete.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { UsersService } from './service/user-service.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: User[] = [];
  isLoading: boolean = true; // Variable para controlar el estado de carga
  readonly dialog = inject(MatDialog);
  authUser$: Observable<User | null>;

  constructor(private authService: AuthService, private usersService: UsersService) {
    this.authUser$ = this.authService.authUser$;
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers$().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar los usuarios:', error);
        this.isLoading = false;
      }
    });
  }

  onSaveUser(id?: number): void {
    const user = id ? this.users.find(user => user.id === id) : null; // Busca el usuario por ID si se proporciona uno
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
      data: { user: user } // Pasa los datos del usuario al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.usersService.postUser(result, id); // Guarda el nuevo usuario o los cambios realizados
      this.loadUsers(); // Recarga la lista de usuarios
    });
  }

  onDeleteUser(id: number) {
    const dialogRef = this.dialog.open(UsersDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersService.deleteUser(id); // Elimina el usuario si se confirma
        this.loadUsers(); // Recarga la lista de usuarios
      }
    });
  }
}
