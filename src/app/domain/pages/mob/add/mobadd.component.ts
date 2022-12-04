import { Component, OnInit } from '@angular/core';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { ToolType } from '../../../models/tool/tool.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { BiomeAddComponent } from '../../biome/add/biomeadd.component';
import { EntityType } from 'src/app/domain/models/entity/entity.model';

@Component({
  selector: 'app-mobadd',
  templateUrl: './mobadd.component.html',
})
export class MobAddComponent implements OnInit {
  mob!: Mob;

  constructor(
    private mobService: MobService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
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
      this.mob.createdBy = this.userService.getUserById('8')._id!;
      this.mob.creationDate = new Date();
      this.mob.lastUpdateDate = new Date();
      this.mobService.addMob(this.mob);
      this.playAudio();
      this.router.navigate(['/mobs/' + this.mob._id]);
      console.log('MobAddComponent Mob added');
      console.log(this.mob);
    }
  }
}
