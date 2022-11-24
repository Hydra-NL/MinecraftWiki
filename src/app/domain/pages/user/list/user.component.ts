import { Component } from '@angular/core';
import { UserService } from 'src/app/domain/models/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  users: any[] = [];

  constructor(private userService: UserService) {
    console.log('UserService constructor');
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.users.sort((a, b) => {
      return b.subscribers.length - a.subscribers.length;
    });
    console.log(this.users);
  }
}
