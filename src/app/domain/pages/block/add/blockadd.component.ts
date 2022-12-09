import { Component, OnInit } from '@angular/core';
import { Block } from 'src/app/domain/models/block/block.model';
import { BlockService } from 'src/app/domain/models/block/block.service';
import { Router } from '@angular/router';
import { ToolType } from '../../../models/tool/tool.model';
import { Biome } from 'src/app/domain/models/biome/biome.model';
import { EntityType } from 'src/app/domain/models/entity/entity.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-blockadd',
  templateUrl: './blockadd.component.html',
})
export class BlockAddComponent implements OnInit {
  block!: Block;
  currentUserId: string | undefined;
  subscription!: Subscription;

  constructor(
    private blockService: BlockService,
    private router: Router,
    private authService: AuthService
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
      dislikedBy: [],
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
      this.block.name =
        this.block.name.charAt(0).toUpperCase() + this.block.name.slice(1);
      this.block.name = this.block.name.trimEnd();

      this.block.biome.name =
        this.block.biome.name.charAt(0).toUpperCase() +
        this.block.biome.name.slice(1);
      this.block.biome.name = this.block.biome.name.trimEnd();

      this.block.createdBy = this.currentUserId =
        this.authService.getUserIdFromLocalStorage();

      this.subscription = this.blockService.create(this.block).subscribe({
        next: (block) => {
          this.playAudio();

          console.log('BlockAddComponent Block added');
          console.log(this.block);
          this.router.navigate(['/blocks/', block._id]);
        },
        error: (err) =>
          console.error(
            'An error occurred while trying to create a block: ' + err
          ),
      });
    }
  }
}
