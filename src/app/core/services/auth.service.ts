import { Injectable } from '@angular/core';
import { User } from '../models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$: Observable<User | null> = this._authUser$.asObservable();

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): void {
    this.http
      .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .subscribe({
        next: (response) => {
          const user = response[0];
          if (user) {
            localStorage.setItem('token', user.token);
            this._authUser$.next(user);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Usuario o contraseña inválidos');
          }
        },
        error: () => {
          alert('Error al intentar iniciar sesión. Verifica tu conexión.');
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._authUser$.next(null);
    this.router.navigate(['/login']);
  }

  verifyToken(): Observable<User | boolean> {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      return of(false);
    }

    return this.http.get<User[]>(`${this.apiUrl}?token=${storedToken}`).pipe(
      map((response) => {
        const user = response[0];
        if (user) {
          this._authUser$.next(user);
          return user;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  register(
    username: string,
    password: string
  ): Observable<{ success: boolean; message: string }> {
    if (!username || !password) {
      return of({
        success: false,
        message: 'Por favor, completa todos los campos',
      });
    }

    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          return of({ success: false, message: 'El usuario ya existe' });
        }

        const newUser: User = {
          username,
          password,
          role: 'user',
          token: this.generateToken(),
        } as User;

        return this.http.post<User>(this.apiUrl, newUser).pipe(
          map(() => ({
            success: true,
            message: 'Registro exitoso',
          })),
          catchError(() =>
            of({
              success: false,
              message: 'Error al registrar el usuario',
            })
          )
        );
      }),
      catchError(() =>
        of({
          success: false,
          message: 'Error al verificar el usuario',
        })
      )
    );
  }

  private generateToken(): string {
    return `${this.randomString()}-${this.randomString()}-${this.randomString()}-${this.randomString()}-${this.randomString(12)}`;
  }

  private randomString(length: number = 4): string {
    return Math.random().toString(36).substring(2, 2 + length);
  }
}
