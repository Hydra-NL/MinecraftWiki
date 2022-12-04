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
    this.subscription = this.userService.list().subscribe({
      // Get users (used for retrieving the subscriptions of the currentUser)
      next: (users) => {
        this.users = users!;
        console.log('users: ' + this.users);
      },
      error: (err) => {
        console.log(
          'An error occured while retrieving a list of users: ' + err
        );
      },
    });

    // Id of the user's detailpage
    this.userId = this.route.snapshot.params['id'];

    // User of this detailpage
    this.subscription = this.userService.read(this.userId).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.log(
          'An error occured while retrieving the user from this page: ' + err
        );
      },
    });

    // User stats
    this.pages = [...this.mobs, ...this.tools, ...this.blocks];
    this.pagesCreated = this.pages.length;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].subscriptions.includes(this.currentUser?._id!)) {
        this.subscriptions.push(this.users[i]);
        this.totalSubs = this.subscriptions.length;
      }
    }
    console.log('subscriptions length: ' + this.subscriptions.length);
    for (let i = 0; i < this.pages.length; i++) {
      if (this.pages[i].likedBy.includes(this.currentUser?._id!)) {
        this.likes.push(this.pages[i]);
        this.totalLikes = this.likes.length;
      }
    }

    // Moet nog current user worden
    this.subscription = this.userService
      .read('638a0fd2abf8e7b2eb1bb039')
      .subscribe({
        next: (currentUser) => {
          this.currentUser = currentUser;
        },
        error: (err) => {
          console.log(
            'An error occured while retrieving the currentuser: ' + err
          );
        },
      });

    // Get mobs
    this.subscription = this.mobService.list().subscribe({
      next: (mobs) => {
        this.mobs = mobs!;
        this.mobs.filter((mob) => mob.createdBy == this.currentUser?._id);
      },
      error: (err) => {
        console.log(
          'An error occured while retrieving the mobs from this page: ' + err
        );
      },
    });

    // Get tools
    this.subscription = this.toolService.list().subscribe({
      next: (tools) => {
        this.tools = tools!;
        this.tools.filter((tool) => tool.createdBy === this.currentUser?._id);
        console.log('tools: ' + this.tools);
        console.log('currentuser id ' + this.currentUser?._id);
      },
      error: (err) => {
        console.log(
          'An error occured while retrieving the tools from this page: ' + err
        );
      },
    });

    // Get blocks
    this.subscription = this.blockService.list().subscribe({
      next: (blocks) => {
        this.blocks = blocks!;
        this.blocks.filter((block) => block.createdBy == this.currentUser?._id);
      },
      error: (err) => {
        console.log(
          'An error occured while retrieving the blocks from this page: ' + err
        );
      },
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
