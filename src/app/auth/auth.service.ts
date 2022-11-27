import { Injectable } from '@angular/core';
import { User } from '../domain/models/user/user.model';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User>(undefined!);
  private readonly CURRENT_USER = 'currentuser';
  endpoint: string = 'http://localhost:3000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  register(user: User): Observable<any> {
    let api = `${environment.apiUrl}register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  login(email: string, password: string): Observable<any> {
    console.log(`login at ${environment.apiUrl}auth/login`);

    return this.http
      .post(
        `${environment.apiUrl}auth/login`,
        { email, password },
        { headers: this.headers }
      )
      .pipe(
        map((response: any) => {
          console.log(response);
          this.saveUserToLocalStorage(response);
          localStorage.setItem('access_token', response.token);
          this.currentUser$.next(response);
          console.log(localStorage);
          return response;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          return of(undefined);
        })
      );
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  // Logout
  logout() {
    console.log(localStorage);
    let removeToken = localStorage.removeItem('access_token');
    this.currentUser$.next(undefined!);
    localStorage.clear();
    this.isLoggedIn === false;
    console.log(localStorage);
    console.log(this.isLoggedIn);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // get User
  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
    return of(localUser);
  }

  // get User Id
  getUserIdFromLocalStorage(): string {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
    return localUser._id;
  }

  // User profile
  getUserProfile(id: String): Observable<any> {
    let api = `${environment.apiUrl}/user/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}