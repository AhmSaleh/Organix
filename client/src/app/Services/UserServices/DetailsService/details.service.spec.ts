import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../../../Models/IUser';
@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  UserUrl = 'http://localhost:3000/api/user';
  constructor(private http: HttpClient) {}

  getUser(): Observable<IUser> {
    return this.http
      .get<IUser>(this.UserUrl + '/Email address to be inserted here', {
        headers: {
          'x-auth-token': 'Token to be inserted here',
        },
      })
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
