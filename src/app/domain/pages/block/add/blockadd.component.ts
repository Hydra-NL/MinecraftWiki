import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { ToolType } from '../../../models/tool/tool.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { BiomeAddComponent } from '../../biome/add/biomeadd.component';
import { EntityType } from 'src/app/domain/models/entity/entity.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blockadd',
  templateUrl: './blockadd.component.html',
})
export class BlockAddComponent implements OnInit {
  block!: Block;
  currentUser!: User;
  subscription!: Subscription;

  constructor(
    private blockService: BlockService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('BlockAddComponent constructor');
  }

  ngOnInit() {
    this.block = {
      _id: undefined,
      name: '',
      description: '',
      type: EntityType.block,
      stackable: false,
      stackSize: 0,
      hardness: 0,
      tool: ToolType.pickaxe,
      biome: new Biome(''),
      createdBy: '',
      timePassed: 0,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
      likes: 0,
      likedBy: [],
    };
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Drawmap1.ogg';
    audio.load();
    audio.play();
  }

  addBlock() {
    this.block;
    if (this.block) {
      // Moet currentUser zijn
      this.subscription = this.userService
        .read('638a0fd2abf8e7b2eb1bb039')
        .subscribe({
          next: (currentUser) => {
            this.currentUser = currentUser;
            this.block.name =
              this.block.name.charAt(0).toUpperCase() +
              this.block.name.slice(1);
            this.block.createdBy = this.currentUser._id!;

            this.subscription = this.blockService.create(this.block).subscribe({
              next: (block) => {
                this.playAudio();
                this.router.navigate(['/blocks/', block._id]);
                console.log('BlockAddComponent Block added');
                console.log(this.block);
              },
              error: (err) => console.error('Error: ' + err),
            });
          },
          error: (err) => {
            console.log(
              'An error occured while retrieving the currentuser: ' + err
            );
          },
        });
    }
  }
}
