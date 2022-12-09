import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-blockdetail',
  templateUrl: './blockdetail.component.html',
})
export class BlockDetailComponent implements OnInit {
  blockId: string = '';
  block: Block | undefined;
  blocks: Block[] = [];
  tools: Tool[] = [];
  creator: User | undefined;
  currentUser: User | undefined;
  currentUserId: string | undefined;
  userBlockId!: string;
  biome: Biome | undefined;
  userBlocks: Block[] = [];
  subscription!: Subscription;
  confirmDelete: boolean = false;

  constructor(
    private blockService: BlockService,
    private toolService: ToolService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('BlockComponent constructor');
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      // Block for this page
      this.blockId = this.route.snapshot.params['id'];
      console.log(this.blockId);

      this.subscription = this.blockService.read(this.blockId).subscribe({
        next: (block) => {
          this.block = block;
          console.log(`Block: ${this.block._id}`);
          // Creator of said block
          this.getCreator();
          // Tools that can break this block
          this.subscription = this.toolService.list().subscribe({
            next: (tools) => {
              this.tools = tools!;
              this.tools = this.tools.filter(
                (t) =>
                  t.toolType === this.block?.tool &&
                  t.toolLevel >= this.block?.hardness
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
      this.getUser();

      // Blocks (see also list)
      this.subscription = this.blockService.list().subscribe({
        next: (blocks) => {
          this.blocks = blocks!;
          this.blocks = this.blocks.filter((b) => b._id !== this.block?._id);
          this.blocks.sort((a, b) => a.hardness - b.hardness);
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
              },
            });
        } else {
          console.log('No user found');
        }
      });
  }

  getCreator() {
    this.subscription = this.userService
      .read(this.block?.createdBy!)
      .subscribe({
        next: (creator) => {
          this.creator = creator;
          console.log(`Creator: ${this.creator._id}`);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteBlock() {
    let text = 'Are you sure you want to delete this block?';
    if (confirm(text) == true) {
      this.subscription = this.blockService.delete(this.blockId).subscribe({
        next: () => {
          this.playAudio();
          this.router.navigate(['/blocks']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      return;
    }
  }

  subscribe() {
    if (this.creator?.subscribers.includes(this.currentUserId!)) {
      this.subscription = this.userService
        .unsubscribe(this.currentUserId!, this.creator._id!)
        .subscribe({
          next: () => {
            console.log('Unsubscribed');
            this.getCreator();
          },
        });
      return;
    } else {
      this.subscription = this.userService
        .subscribe(this.currentUserId!, this.creator?._id!)
        .subscribe({
          next: () => {
            console.log('Subscribed');
            this.getCreator();
          },
        });
      return;
    }
  }
}
