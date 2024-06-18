import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  login(): void {
    this.loggedInStatus = true;
  }

  logout(): void {
    this.loggedInStatus = false;
  }
}
