import { Component } from '@angular/core';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { Block } from 'src/app/domain/models/block/block.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/domain/models/user/user.model';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
})
export class BlockComponent {
  blocks: Block[] = [];
  currentUser: User | undefined;
  subscription!: Subscription;

  constructor(private blockService: BlockService, private authService: AuthService) {
    console.log('BlockComponent constructor');
  }

  ngOnInit() {
    this.subscription = this.blockService.list().subscribe({
      next: (blocks) => {
        this.blocks = blocks!;
        console.log(this.blocks);
      },
      error: (err) => {
        console.log('An error occured while retrieving the blocks: ' + err);
      },
    });

    this.subscription = this.authService.getUserFromLocalStorage().subscribe((user) => {
      if (user) {
        this.currentUser = user!;
      }
    });
  }
}
