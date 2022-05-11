import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { IUser } from 'src/app/Models/IUser';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AuthService } from '../auth.service';

export interface IRegesterData {
  email: string;
  password: string;
  name: {
    first: string;
    last: string;
  };
}
export interface ILoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  UserUrl = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient, private auth: AuthService) {}

  addUser(user: IRegesterData): Observable<IRegesterData> {
    return this.http
      .post<IRegesterData>(this.UserUrl + '/register', user)
      .pipe(catchError(this.handleError));
  }
  addUserTemp(user: any): Observable<any> {
    return this.http
      .post<any>(this.UserUrl + '/register', user)
      .pipe(catchError(this.handleError));
  }

  addUserImage(formData: FormData): Observable<FormData> {
    return this.http
      .post<FormData>(this.UserUrl + '/register-pfp', formData)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: ILoginData): Observable<any> {
    return this.http
      .post(this.UserUrl, user, { responseType: 'text', observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  getUser(): Observable<IUser> {
    return this.http
      .get<IUser>(this.UserUrl + '/' + this.auth.getEmail(), {
        headers: {
          'x-auth-token': this.auth.getToken(),
        },
      })
      .pipe(catchError(this.handleError));
  }

  getUserPFP(): Observable<any> {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'x-auth-token': this.auth.getToken(),
      }),
      responseType: 'blob',
    };

    return this.http
      .get<IUser>(this.UserUrl + '/pfp/' + this.auth.getEmail(), httpOptions)
      .pipe(catchError(this.handleError));
  }

  getMerchantInfo(id: string): Observable<IUser> {
    return this.http
      .get<IUser>(this.UserUrl + '/merchant/' + id)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: any): Observable<any> {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'x-auth-token': this.auth.getToken(),
      }),
    };
    return this.http
      .patch(this.UserUrl + '/' + this.auth.getEmail(), user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.UserUrl + '/all')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => error
    );
  }
}
