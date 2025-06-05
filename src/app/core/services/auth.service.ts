import { Injectable } from "@angular/core";
import { User } from "../models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);
  authUser$: Observable<User | null> = this._authUser$.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): void {
    this.http
      .get<User[]>(
        `http://localhost:3000/users?username=${username}&password=${password}`
      )
      .subscribe({
        next: (response) => {
          const user = response[0];
          if (user) {
            localStorage.setItem('token', user.token);
            this.router.navigate(['/dashboard']);
            this._authUser$.next(user);
          } else {
            alert('Invalid username or password');
          }
        },
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this._authUser$.next(null);
  }

  verifyToken(): Observable<User | boolean> {
    const storedToken = localStorage.getItem('token');
    return this.http
      .get<User[]>(`http://localhost:3000/users?token=${storedToken}`)
      .pipe(
        map((response) => {
          const user = response[0];
          if (user) {
            localStorage.setItem('token', user.token);
            this._authUser$.next(user);
            return user;
          } else {
            return false;
          }
        })
      );
  }

  register(username: string, password: string): Observable<{ success: boolean; message: string }> {
    if (!username || !password) {
      return new Observable(observer => {
        observer.next({ success: false, message: 'Por favor, completa todos los campos' });
        observer.complete();
      });
    }

    return new Observable(observer => {
      this.http.get<User[]>(`http://localhost:3000/users?username=${username}`).subscribe({
        next: (users) => {
          if (users.length > 0) {
            observer.next({ success: false, message: 'El usuario ya existe' });
            observer.complete();
          } else {
            const newUser: User = {
              username,
              password,
              role: 'user',
              token: `${Math.random().toString(36).substr(2, 8)}-${Math.random()
                .toString(36).substr(2, 4)}-${Math.random()
                  .toString(36).substr(2, 4)}-${Math.random()
                    .toString(36).substr(2, 4)}-${Math.random()
                      .toString(36).substr(2, 12)}`,
            } as User;
            this.http.post<User>('http://localhost:3000/users', newUser).subscribe({
              next: () => {
                observer.next({ success: true, message: 'Registro exitoso' });
                observer.complete();
              },
              error: () => {
                observer.next({ success: false, message: 'Error al registrar el usuario' });
                observer.complete();
              }
            });
          }
        },
        error: () => {
          observer.next({ success: false, message: 'Error al verificar el usuario' });
          observer.complete();
        }
      });
    });
  }
}