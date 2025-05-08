import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Section {
  name: string;
  icon: string;
  link: string;
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
      link: '/dashboard'
    },
    {
      name: 'Alumnos',
      icon: 'people',
      link: '/dashboard/students'
    },
    {
      name: 'Cursos',
      icon: 'book',
      link: '/dashboard/courses'
    }
  ];

  constructor(private router: Router) {}
  logout() {
    console.log('Logout clicked');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

}
