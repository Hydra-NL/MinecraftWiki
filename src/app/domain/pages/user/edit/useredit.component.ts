import { Component } from '@angular/core';
import { User } from 'src/app/domain/models/user/user.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
})
export class UserEditComponent {
  user!: User;
  currentUser: User | undefined;
  currentUserId: string | undefined;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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

    this.authService.userMayEdit(this.user._id!).subscribe({
      next: (mayEdit) => {
        if (!mayEdit) {
          window.alert('This is not your account!');
          this.router.navigate(['/users/' + this.user._id!]);
        }
      },
    });

    this.getUser();
  }

  getUser() {
    this.currentUser = undefined;
    this.currentUserId = undefined;
    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.currentUserId = this.authService.getUserIdFromLocalStorage();
          this.subscription = this.userService
            .read(this.currentUserId)
            .subscribe({
              next: (user) => {
                this.currentUser = user;
                console.log(`Current user: ${this.currentUser._id}`);
              },
            });
        } else {
          console.log('No user found');
        }
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
