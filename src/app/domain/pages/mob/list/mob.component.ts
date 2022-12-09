import { Component } from '@angular/core';
import { MobService } from '../../../models/mob/mob.service';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/domain/models/user/user.model';

@Component({
  selector: 'app-mob',
  templateUrl: './mob.component.html',
})
export class MobComponent {
  mobs: Mob[] = [];
  subscription!: Subscription;
  currentUser: User | undefined;

  constructor(private mobService: MobService, private authService: AuthService) {
    console.log('MobComponent constructor');
  }

  ngOnInit() {
    this.subscription = this.mobService.list().subscribe({
      next: (mobs) => {
        this.mobs = mobs!;
        console.log(this.mobs);
        console.log('Mobs length: ' + this.mobs.length);
      },
      error: (err) => {
        console.log('An error occured while retrieving the mobs: ' + err);
      },
    });

    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.currentUser = user!;
        }
      });
  }
}
