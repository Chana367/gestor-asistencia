import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../../../../core/models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.users = response;
        this.usersSubject.next(this.users);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  getUsers$(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      map(user => user || null)
    );
  }

  postUser(newUser: User, id?: number): void {
    if (newUser) {
      if (!id) {
        // Crear nuevo usuario
        this.http.post<User>(this.apiUrl, newUser).subscribe({
          next: (createdUser) => {
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al agregar usuario:', err);
          }
        });
      } else {
        // Actualizar usuario existente
        this.http.put<User>(`${this.apiUrl}/${id}`, newUser).subscribe({
          next: (updatedUser) => {
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error al actualizar usuario:', err);
          }
        });
      }
    }
  }

  deleteUser(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }
}