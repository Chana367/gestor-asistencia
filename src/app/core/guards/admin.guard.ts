import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authUser$.pipe(
    tap((user) => {
      if (!user || user.role !== 'admin') {
        alert('No tienes permiso para acceder a esta página.');
        router.navigate(['/login']);
      }
    }),
    map((user) => !!user && user.role === 'admin')
  );
};