import { Component } from '@angular/core';

export interface Section {
  name: string;
  icon: string;
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
    },
    {
      name: 'Alumnos',
      icon: 'people',
    },
    {
      name: 'Cursos',
      icon: 'book',
    },
    {
      name: 'Cerrar sesión',
      icon: 'logout',
    }
  ];

}
