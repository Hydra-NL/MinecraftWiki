import { Component } from '@angular/core';
import { User } from 'src/app/domain/models/user/user.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
})
export class UserEditComponent {
  user!: User;
  currentUser: User | undefined;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('UserService constructor');
  }

  ngOnInit() {
    this.subscription = this.userService
      .read(this.route.snapshot.params['id'])
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (err) => {
          console.log(
            'An error occured while retrieving the user from this page: ' + err
          );
        },
      });

    // Moet nog current user worden
    this.subscription = this.userService
      .read('638a0fd2abf8e7b2eb1bb039')
      .subscribe({
        next: (currentUser) => {
          this.currentUser = currentUser;
        },
        error: (err) => {
          console.log(
            'An error occured while retrieving the currentuser: ' + err
          );
        },
      });
  }

  updateUser() {
    this.subscription = this.userService.update(this.user).subscribe({
      next: (user) => {
        this.user = user;
    this.router.navigate(['/users', this.user._id]);
      },
      error: (err) => {
        console.log('An error occured while updating the user: ' + err);
      },
    });
  }
}
