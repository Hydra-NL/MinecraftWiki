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
  userBlockId!: string;
  biome: Biome | undefined;
  userBlocks: Block[] = [];
  subscription!: Subscription;

  constructor(
    private blockService: BlockService,
    private toolService: ToolService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
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
          // Tools that can break this block
          this.subscription = this.toolService.list().subscribe({
            next: (tools) => {
              this.tools = tools!;
              console.log('Before: ' + this.tools);
              this.tools = this.tools.filter(
                (tool) =>
                  tool.toolType === this.block?.tool &&
                  tool.toolLevel >= this.block?.hardness
              );
              console.log('After: ' + this.tools);
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
      // Moet current user worden
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

  deleteBlock() {
    this.subscription = this.blockService.delete(this.blockId).subscribe({
      next: () => {
        this.playAudio();
        this.router.navigate(['/blocks']);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
