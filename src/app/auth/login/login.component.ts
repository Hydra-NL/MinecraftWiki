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
  signinForm!: FormGroup;
  error: string | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  loginUser(): void {
    if (this.signinForm.valid) {
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;

      this.subscription = this.authService
        .login(email, password)
        .subscribe((result) => {
          if (result !== undefined) {
            this.router.navigate(['/']);
            console.log(result + ' logged in');
          } else {
            this.error = 'Login information is not correct';
          }
        });
    } else {
      console.log('Form is not valid');
      return;
    }
  }
}
