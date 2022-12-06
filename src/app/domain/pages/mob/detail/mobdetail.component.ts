import { Component, OnInit } from '@angular/core';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobdetail',
  templateUrl: './mobdetail.component.html',
})
export class MobDetailComponent implements OnInit {
  mob: Mob | undefined;
  mobs: Mob[] = [];
  tools: Tool[] = [];
  creator: User | undefined;
  currentUser: User | undefined;
  userMobId!: string;
  biome: Biome | undefined;
  userMobs: Mob[] = [];
  subscription!: Subscription 

  constructor(
    private mobService: MobService,
    private toolService: ToolService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('MobComponent constructor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      // Mob for this page
      this.mob = this.mobService.getMob(this.route.snapshot.params['id']);
      this.biome = this.mob?.biome;
      console.log(this.route.snapshot.params['id']);

      // Creator of said mob
      this.userMobId = this.mob?.createdBy || '';
      this.creator = this.userService.getUserById(this.userMobId);

      // Current user
      // Moet current user worden
      this.currentUser = this.userService.getUserById('1');

      // Mobs (see also list)
      this.mobs = this.mobService.getMobs();
      this.mobs = this.mobs.filter((mob) => mob._id !== this.mob?._id);
      this.mobs.sort((a, b) => a.health - b.health);

      // Tools that can attack this mob
      this.tools = this.toolService
        .getTools()
        .filter((tool) => tool.toolType == 'Sword')
        .filter((tool) => tool.attack >= this.mob!.armor);

    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Explosion1.ogg';
    audio.load();
    audio.play();
  }

  deleteMob() {
    this.mobService.deleteMob(this.mob!._id!);
    this.playAudio();
    this.router.navigate(['/mobs']);
  }

  subscribe() {
    if (this.creator!.subscribers.includes(this.currentUser!._id!)) {
      this.subscription = this.userService.update(this.creator!).subscribe({
        next: () => {
          this.creator!.subscribers = this.creator!.subscribers.filter(
            (s) => s !== this.currentUser!._id
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.subscription = this.userService.update(this.creator!).subscribe({
        next: () => {
          this.creator!.subscribers.push(this.currentUser!._id!);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
