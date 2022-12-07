import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-add',
  templateUrl: './homeadd.component.html',
})
export class HomeAddComponent implements OnInit {
  subscription!: Subscription;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['/']);
        }
      });
  }
}
