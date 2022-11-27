import { Component, OnInit } from '@angular/core';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool, ToolType } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { UserService } from 'src/app/domain/models/user/user.service';
import { Subscription } from 'rxjs';
import { Biome, Dimension } from 'src/app/domain/models/biome/biome.model';
import { User } from 'src/app/domain/models/user/user.model';

@Component({
  selector: 'app-mobedit',
  templateUrl: './mobedit.component.html',
})
export class MobEditComponent implements OnInit {
  mobId: string = this.route.snapshot.params['id'];
  mob: Mob | undefined;
  biome: Biome | undefined;
  subscription!: Subscription;

  constructor(
    private mobService: MobService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('MobEditComponent constructor');
  }

  ngOnInit() {
    this.mob = this.mobService.getMob(this.mobId);

    this.biome = this.mob?.biome;
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Smithing_Table1.ogg';
    audio.load();
    audio.play();
    console.log('playAudio');
  }

  updateMob() {
    if (this.mob) {
      this.mob.lastUpdateDate = new Date();
      this.mobService.updateMob(this.mob);
      this.router.navigate(['/mobs/' + this.mobId]);
      console.log('MobEditComponent updateMob');
      console.log(this.mob);
      this.playAudio();
    } else {
      this.router.navigate(['/mobs/' + this.mobId + '/edit']);
    }
  }
}
