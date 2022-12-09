import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../domain/models/user/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('canActivate LoggedIn');
    return this.authService.currentUser$.pipe(
      map((user: User | undefined) => {
        if (user) {
          return true;
        } else {
          window.alert('You are not allowed to view this page!');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
