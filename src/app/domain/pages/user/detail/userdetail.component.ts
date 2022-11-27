import { Component } from '@angular/core';
import { User } from 'src/app/domain/models/user/user.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MobService } from 'src/app/domain/models/mob/mob.service';
import { ToolService } from 'src/app/domain/models/tool/tool.service';
import { BlockService } from 'src/app/domain/models/block/block.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
})
export class UserDetailComponent {
  user!: User;
  currentUser: User | undefined;
  pagesCreated: number = 0;
  pages: any[] = [];
  mobs: any[] = [];
  tools: any[] = [];
  blocks: any[] = [];
  totalLikes: number = 0;
  totalSubs: number = 0;
  results: boolean = false;

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
    this.route.paramMap.subscribe((params: any) => {
      this.user = this.userService.getUserById(
        this.route.snapshot.params['id']
      );
      // Moet nog current user worden
      this.currentUser = this.userService.getUserById('1');
      this.mobs = this.mobService.getMobsByUser(
        this.route.snapshot.params['id']
      );
      this.tools = this.toolService.getToolsByUser(
        this.route.snapshot.params['id']
      );
      this.blocks = this.blockService.getBlocksByUser(
        this.route.snapshot.params['id']
      );
      this.pages = [...this.mobs, ...this.tools, ...this.blocks];
      this.pagesCreated = this.pages.length;
      this.totalLikes = this.pages.reduce((a, b) => a + b.likes, 0);
      this.totalSubs = this.user.subscribers.length;
    });
  }

  deleteProfile() {
    this.userService.deleteUser(this.user!._id!);
    // User moet uitloggen
    this.router.navigate(['/home']);
  }
}
