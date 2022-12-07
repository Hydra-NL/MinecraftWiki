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
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mobdetail',
  templateUrl: './mobdetail.component.html',
})
export class MobDetailComponent implements OnInit {
  mobId: string = '';
  mob: Mob | undefined;
  mobs: Mob[] = [];
  tools: Tool[] = [];
  creator: User | undefined;
  currentUser: User | undefined;
  currentUserId: string | undefined;
  userMobId!: string;
  biome: Biome | undefined;
  userMobs: Mob[] = [];
  subscription!: Subscription;

  constructor(
    private mobService: MobService,
    private toolService: ToolService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('MobComponent constructor');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      // Mob for this page
      this.mobId = this.route.snapshot.params['id'];
      console.log(this.mobId);

      // Creator of said mob
      this.subscription = this.mobService.read(this.mobId).subscribe({
        next: (mob) => {
          this.mob = mob;
          console.log(`Mob: ${this.mob._id}`);
          // Creator of said mob
          this.subscription = this.userService
            .read(this.mob?.createdBy!)
            .subscribe({
              next: (creator) => {
                this.creator = creator;
                console.log(`Creator: ${this.creator._id}`);
              },
              error: (err) => {
                console.log(err);
              },
            });
          // Tools that can attack this mob
          this.subscription = this.toolService.list().subscribe({
            next: (tools) => {
              this.tools = tools!;
              this.tools = this.tools.filter(
                (t) => t.toolType === 'Sword' && t.attack >= this.mob!.armor
              );
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
      // Current user
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

      // Mobs (see also list)
      this.subscription = this.mobService.list().subscribe({
        next: (mobs) => {
          this.mobs = mobs!;
          this.mobs = this.mobs.filter((m) => m._id !== this.mob?._id);
          this.mobs.sort((a, b) => b.health - a.health);
          console.log(`Mobs: ${this.mobs.length}`);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Explosion1.ogg';
    audio.load();
    audio.play();
  }

  deleteMob() {
    this.subscription = this.mobService.delete(this.mobId).subscribe({
      next: () => {
        this.playAudio();
        this.router.navigate(['/mobs']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  subscribe() {
    if (this.creator?.subscribers.includes(this.currentUserId!)) {
      this.creator?.subscribers.splice(
        this.creator?.subscribers.indexOf(this.currentUserId!),
        1
      );
      this.subscription = this.userService.update(this.creator!).subscribe({
        next: () => {
          console.log('Unsubscribed');
        },
      });
      this.currentUser?.subscriptions.splice(
        this.currentUser?.subscriptions.indexOf(this.creator?._id!),
        1
      );
      this.subscription = this.userService.update(this.currentUser!).subscribe({
        next: () => {
          console.log('Unsubscribed');
        },
      });
      return;
    } else {
      this.creator?.subscribers.push(this.currentUserId!);
      this.subscription = this.userService.update(this.creator!).subscribe({
        next: () => {
          console.log('Subscribed');
        },
      });

      this.currentUser?.subscriptions.push(this.creator?._id!);
      this.subscription = this.userService.update(this.currentUser!).subscribe({
        next: () => {
          console.log('Subscribed');
        },
      });
    }
  }
}
