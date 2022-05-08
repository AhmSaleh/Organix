import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from 'src/app/Models/IUser';
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

  getMerchantInfo(id: string): Observable<IUser> {
    return this.http
      .get<IUser>(this.UserUrl + '/merchant/' + id)
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
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
