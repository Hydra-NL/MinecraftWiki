import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../domain/models/user/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  darkTheme: boolean = false;
  currentTime: Date = new Date();
  loggedInUser$: Observable<User> | undefined;
  currentUserId$: string = '';

  constructor(private authService: AuthService) {
    console.log('NavComponent constructor');
  }

  ngOnInit() {
    console.log('NavComponent ngOnInit');
    this.loggedInUser$ = this.authService.currentUser$;
    console.log('logged in user: ' + this.loggedInUser$);

    if (this.currentTime.getHours() >= 18 || this.currentTime.getHours() <= 6) {
      this.switchTheme();
    }
  }

  switchTheme() {
    if (!this.darkTheme) {
      document.body.classList.add('dark');
      this.darkTheme = true;
    } else {
      document.body.classList.remove('dark');
      this.darkTheme = false;
    }
    console.log(this.darkTheme);
  }
}
