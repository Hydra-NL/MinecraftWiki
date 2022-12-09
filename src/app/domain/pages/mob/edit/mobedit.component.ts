import { Component, OnInit } from '@angular/core';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { User } from 'src/app/domain/models/user/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mobedit',
  templateUrl: './mobedit.component.html',
})
export class MobEditComponent implements OnInit {
  mobId: string = this.route.snapshot.params['id'];
  mob: Mob | undefined;
  currentUser: User | undefined;
  subscription!: Subscription;

  constructor(
    private mobService: MobService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('MobEditComponent constructor');
  }

  ngOnInit() {
    this.subscription = this.mobService.read(this.mobId).subscribe({
      next: (mob) => {
        this.mob = mob;
        console.log(`Mob: ${this.mob._id}`);
      },
      error: (err) => {
        console.log('An error occurred while retrieving the mob: ' + err);
      },
    });
    this.authService.userMayEdit(this.mob?.createdBy!).subscribe({
      next: (mayEdit) => {
        if (!mayEdit) {
          window.alert('This is not your mob!');
          this.router.navigate(['/mobs/' + this.mobId]);
        }
      }
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Smithing_Table1.ogg';
    audio.load();
    audio.play();
    console.log('playAudio');
  }

  updateMob() {
    this.subscription = this.mobService.update(this.mob!).subscribe({
      next: (mob) => {
        this.mob = { ...mob };
        this.playAudio();
        this.router.navigate(['/mobs/' + this.mobId]);
      },
    });
  }
}
