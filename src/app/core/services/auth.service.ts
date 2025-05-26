import { Injectable } from "@angular/core";
import { User } from "../models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

const users: User[] = [

];

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
            console.log('User:', user);
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
}