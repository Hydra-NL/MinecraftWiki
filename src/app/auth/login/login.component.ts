import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
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
  }

  ngOnDestroy(): void {}

  login() {
    this.subscription = this.authService
      .login(this.user.email, this.user.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
  }
}
