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

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
})
export class UserDetailComponent {
  user!: User;
  userId: string = '';
  currentUser: User | undefined;
  pagesCreated: number = 0;
  pages: any[] = [];
  users: User[] = [];
  mobs: Mob[] = [];
  tools: Tool[] = [];
  blocks: Block[] = [];
  likes: any[] = [];
  totalLikes: number = 0;
  subscriptions: User[] = [];
  totalSubs: number = 0;
  results: boolean = false;
  subscription!: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private mobService: MobService,
    private toolService: ToolService,
    private blockService: BlockService
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

      this.subscription = this.userService.list().subscribe({
        // Get users (used for retrieving the subscriptions of the currentUser)
        next: (users) => {
          this.users = users!;
          console.log('users: ' + this.users);
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].subscribers.includes(this.user._id!)) {
              console.log('user: ' + this.users[i]);
              this.subscriptions.push(this.users[i]);
            }
          }
        },
        error: (err) => {
          console.log(
            'An error occured while retrieving a list of users: ' + err
          );
        },
      });

      // Moet nog current user worden
      this.subscription = this.userService
        .read('638a0fd2abf8e7b2eb1bb039')
        .subscribe({
          next: (currentUser) => {
            this.currentUser = currentUser;
            // Get mobs
            this.subscription = this.mobService.list().subscribe({
              next: (mobs) => {
                this.mobs = mobs!;
                for (let i = 0; i < this.mobs.length; i++) {
                  if (this.mobs[i].createdBy === this.user!._id) {
                    this.pages.push(this.mobs[i]);
                    this.pagesCreated = this.pages.length;
                    this.totalLikes += this.mobs[i].likes;
                    if (this.mobs[i].likedBy.includes(this.currentUser?._id!)) {
                      this.likes.push(this.mobs[i]);
                    }
                  }
                }
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
                    if (
                      this.tools[i].likedBy.includes(this.currentUser?._id!)
                    ) {
                      this.likes.push(this.tools[i]);
                    }
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
                    if (
                      this.blocks[i].likedBy.includes(this.currentUser?._id!)
                    ) {
                      this.likes.push(this.blocks[i]);
                    }
                  }
                }
                console.log('pagesCreated: ' + this.pagesCreated);
              },
            });
          },
          error: (err) => {
            console.log(
              'An error occured while retrieving the currentuser: ' + err
            );
          },
        });
    });
  }

  deleteProfile() {
    // User moet uitloggen
    this.subscription = this.userService
      .delete(this.currentUser?._id!)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
      });
  }
}
