import { Component } from '@angular/core';
import { User } from 'src/app/domain/models/user/user.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
})
export class UserEditComponent {
  user!: User;
  currentUser: User | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('UserService constructor');
  }

  ngOnInit() {
    this.user = this.userService.getUserById(this.route.snapshot.params['id']);
    // Moet nog current user worden
    this.currentUser = this.userService.getUserById('1');
  }

  updateUser() {
    this.userService.updateUser(this.user);
    this.router.navigate(['/users', this.user._id]);
  }
}
