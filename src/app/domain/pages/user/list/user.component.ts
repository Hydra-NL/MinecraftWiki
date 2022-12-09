import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/domain/models/user/user.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})

export class UserComponent {
  users: User[] = [];
  BASE_URL = environment.apiUrl;
  subscription: Subscription | undefined;

  constructor(private userService: UserService, private http: HttpClient) {
    console.log('UserService constructor');
  }

  ngOnInit() {
    this.subscription = this.userService.list().subscribe({
      next: (users) => {
        this.users = users!;
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.users);
  }
}
