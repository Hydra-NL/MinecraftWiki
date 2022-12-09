import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = {
      email: '',
      password: '',
    };
    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {}

  login() {
    this.subscription = this.authService
      .getUserByEmail(this.user.email)
      .subscribe({
        next: (user) => {
          if (user) {
            if (user.email === this.user.email) {
              this.authService.login(this.user.email, this.user.password);
            } else {
              window.alert('Invalid credentials!');
            }
          } else {
            window.alert('User not found!');
          }
        },
        error: (err) => {
          console.log('An error occurred while retrieving the user: ' + err);
        },
      });
  }
}
