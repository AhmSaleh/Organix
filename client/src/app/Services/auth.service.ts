import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  login(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRole() {
    if (this.isLoggedIn()) return atob(this.getToken().split('.')[1]);
    throw new Error('No logged in user to find the role.');
  }
}
