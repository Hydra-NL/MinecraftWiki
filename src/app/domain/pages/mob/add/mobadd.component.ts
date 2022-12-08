import { Component, OnInit } from '@angular/core';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/domain/models/user/user.service';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { EntityType } from 'src/app/domain/models/entity/entity.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mobadd',
  templateUrl: './mobadd.component.html',
})
export class MobAddComponent implements OnInit {
  mob!: Mob;
  currentUserId: string | undefined;
  subscription!: Subscription;

  constructor(
    private mobService: MobService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('MobAddComponent constructor');
  }

  ngOnInit() {
    this.mob = {
      _id: undefined,
      name: '',
      description: '',
      type: EntityType.mob,
      health: 0,
      attack: 0,
      armor: 0,
      isPassive: false,
      biome: new Biome(''),
      createdBy: '',
      timePassed: 0,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    };
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Drawmap1.ogg';
    audio.load();
    audio.play();
  }

  addMob() {
    this.mob;
    if (this.mob) {
      this.mob.name =
        this.mob.name.charAt(0).toUpperCase() + this.mob.name.slice(1);
      this.mob.name = this.mob.name.trimEnd();

      this.mob.biome.name = this.mob.biome.name.charAt(0).toUpperCase() + this.mob.biome.name.slice(1);
      this.mob.biome.name = this.mob.biome.name.trimEnd();
      
        this.mob.createdBy = this.currentUserId =
        this.authService.getUserIdFromLocalStorage();

      this.subscription = this.mobService.create(this.mob).subscribe({
        next: (mob) => {
          this.playAudio();
          this.router.navigate(['/mobs/', mob._id]);
          console.log('MobAddComponent Mob added');
          console.log(this.mob);
        },
        error: (err) =>
          console.error(
            'An error occurred while trying to create a mob: ' + err
          ),
      });
    }
  }
}
