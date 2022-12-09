import { Component } from '@angular/core';
import { User } from 'src/app/domain/models/user/user.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { ToolService } from 'src/app/domain/models/tool/tool.service';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { Subscription } from 'rxjs';
import { Tool } from 'src/app/domain/models/tool/tool.model';
import { Mob } from 'src/app/domain/models/mob/mob.model';
import { Block } from 'src/app/domain/models/block/block.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
})
export class UserDetailComponent {
  user!: User;
  userId: string = '';
  currentUser: User | undefined;
  currentUserId: string | undefined;
  pagesCreated: number = 0;
  pages: any[] = [];
  users: User[] = [];
  mobs: Mob[] = [];
  tools: Tool[] = [];
  blocks: Block[] = [];
  likes: any[] = [];
  totalLikes: number = 0;
  subs: User[] = [];
  totalSubs: number = 0;
  results: boolean = false;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private mobService: MobService,
    private toolService: ToolService,
    private blockService: BlockService,
    private authService: AuthService
  ) {
    console.log('UserService constructor');
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      // Id of the user's detailpage
      this.userId = this.route.snapshot.params['id'];

      // User of this detailpage
      this.subscription = this.userService.read(this.userId).subscribe({
        next: (user) => {
          this.user = user;

          console.log('userId: ' + this.user._id);
          this.totalSubs = this.user.subscribers.length;
        },
        error: (err) => {
          console.log(
            'An error occured while retrieving the user from this page: ' + err
          );
        },
      });

      // Get tools
      this.subscription = this.toolService.list().subscribe({
        next: (tools) => {
          this.tools = tools!;
          for (let i = 0; i < this.tools.length; i++) {
            if (this.tools[i].createdBy === this.user!._id) {
              this.pages.push(this.tools[i]);
              this.pagesCreated = this.pages.length;
              this.totalLikes += this.tools[i].likes;
            }
          }
        },
      });

      // Get blocks
      this.subscription = this.blockService.list().subscribe({
        next: (blocks) => {
          this.blocks = blocks!;
          for (let i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].createdBy === this.user!._id) {
              this.pages.push(this.blocks[i]);
              this.pagesCreated = this.pages.length;
              this.totalLikes += this.blocks[i].likes;
            }
          }
          console.log('pagesCreated: ' + this.pagesCreated);
        },
      });

      // Get mobs
      this.subscription = this.mobService.list().subscribe({
        next: (mobs) => {
          this.mobs = mobs!;
          for (let i = 0; i < this.mobs.length; i++) {
            if (this.mobs[i].createdBy === this.user!._id) {
              this.pages.push(this.mobs[i]);
              this.pagesCreated = this.pages.length;
              this.totalLikes += this.mobs[i].likes;
            }
          }
        },
      });

      this.getUser();
    });
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

                this.getSubscriptions();
                this.getLikedPages();
              },
            });
        } else {
          console.log('No user found');
        }
      });
  }

  getSubscriptions() {
    for (let i = 0; i < this.currentUser!.subscriptions.length; i++) {
      this.subscription = this.userService
        .read(this.currentUser!.subscriptions[i])
        .subscribe({
          next: (sub) => {
            this.subs.push(sub);
            console.log('Your subscriptions: ' + this.subs);
          },
        });
    }
  }

  getLikedPages() {
    for (let i = 0; i < this.currentUser!.liked.length; i++) {
      this.subscription = this.toolService
        .read(this.currentUser!.liked[i])
        .subscribe({
          next: (tool) => {
            if (tool) {
              this.likes.push(tool);
              console.log('Your liked pages: ' + this.likes);
            }

            this.subscription = this.blockService
              .read(this.currentUser!.liked[i])
              .subscribe({
                next: (block) => {
                  if (block) {
                    this.likes.push(block);
                    console.log('Your liked pages: ' + this.likes);
                  }

                  this.subscription = this.mobService
                    .read(this.currentUser!.liked[i])
                    .subscribe({
                      next: (mob) => {
                        if (mob) {
                          this.likes.push(mob);
                          console.log('Your liked pages: ' + this.likes);
                        }
                      },
                    });
                },
              });
          },
        });
    }
  }
}
