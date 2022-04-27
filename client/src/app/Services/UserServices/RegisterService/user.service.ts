import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


export interface IRegesterData {
  email: string;
  password: string;
  name: {
      first: string;
      last: string;
  },
}
export interface ILoginData {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  UserUrl = 'http://localhost:3000/api/user';
  constructor(private http:HttpClient) { }

  addUser(user: IRegesterData): Observable<IRegesterData>{
    return this.http.post<IRegesterData>(this.UserUrl+"/register", user).pipe(
      catchError(this.handleError)
    );
  }
  

  loginUser(user: ILoginData): Observable<any>{
    return this.http.post(this.UserUrl, user).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
