import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authService: AuthService){ }
  
  ngOnInit() {
    this.authService.verifyToken().subscribe();
  }
 }
