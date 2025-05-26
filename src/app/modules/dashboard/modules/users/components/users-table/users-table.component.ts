import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../../../../core/models';
import { AuthService } from '../../../../../../core/services/auth.service';


@Component({
  selector: 'app-users-table',
  standalone: false,
  templateUrl: './users-table.component.html',
  styles: ``
})
export class UsersTableComponent {

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'actions'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<number>();

  authUser$ = inject(AuthService).authUser$;

}
