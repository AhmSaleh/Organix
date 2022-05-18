import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  login(token: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getEmail() {
    return localStorage.getItem('email') || '';
  }

  getRole() {
    if (this.isLoggedIn()) return atob(this.getToken().split('.')[1]);
    throw new Error('No logged in user to find the role.');
  }

  isAdmin() {
    if (this.isLoggedIn())
      return atob(this.getToken().split('.')[1]) === 'admin';

    throw new Error('No logged in user to find if admin or not.');
  }

  //get user id
  getUserId() {
    if (this.isLoggedIn())
      return JSON.parse(atob(this.getToken().split('.')[1])).UserId;
    throw new Error('Not logged in');
  }
}
