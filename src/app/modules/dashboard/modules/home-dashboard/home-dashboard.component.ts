import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home-dashboard',
  standalone: false,
  templateUrl: './home-dashboard.component.html',
  styles: ``
})
export class HomeDashboardComponent {

  authUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }
}
