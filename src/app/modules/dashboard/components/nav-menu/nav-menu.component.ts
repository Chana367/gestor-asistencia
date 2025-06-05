import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models';

export interface Section {
  name: string;
  icon: string;
  link: string;
  permission: string[];
}

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  items: Section[] = [
    {
      name: 'Inicio',
      icon: 'home',
      link: '/dashboard',
      permission: ['admin', 'user']
    },
    {
      name: 'Estudiantes',
      icon: 'people',
      link: '/dashboard/students',
      permission: ['admin', 'user']
    },
    {
      name: 'Cursos',
      icon: 'book',
      link: '/dashboard/courses',
      permission: ['admin', 'user']
    },
    {
      name: 'Inscripciones',
      icon: 'school',
      link: '/dashboard/inscriptions',
      permission: ['admin', 'user']
    },
    {
      name: 'Usuarios',
      icon: 'manage_accounts',
      link: '/dashboard/users',
      permission: ['admin']
    }
  ];

  authUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  trackItem(index: number, item: Section): string {
    return item.link;
  }
}
