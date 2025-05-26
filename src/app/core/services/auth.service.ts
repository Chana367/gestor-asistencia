import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  login(username: string, password: string): boolean {
    // Aquí iría la lógica de autenticación real
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}