import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor() { }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('usuario'); // Verifica si existe el usuario en localStorage
  }

  login(): void {
    this.loggedInStatus = true;
  }

  logout(): void {
    this.loggedInStatus = false;
  }
}
