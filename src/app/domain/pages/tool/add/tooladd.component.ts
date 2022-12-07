import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { ToolType } from '../../../models/tool/tool.model';
import { EntityType } from 'src/app/domain/models/entity/entity.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tooladd',
  templateUrl: './tooladd.component.html',
})
export class ToolAddComponent implements OnInit {
  tool!: Tool;
  currentUserId!: string;
  subscription!: Subscription;

  constructor(
    private toolService: ToolService,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('ToolAddComponent constructor');
  }

  ngOnInit() {
    this.tool = {
      _id: undefined,
      name: '',
      description: '',
      type: EntityType.tool,
      durability: 0,
      isWeapon: false,
      attack: 0,
      toolLevel: 0,
      toolType: ToolType.pickaxe,
      createdBy: '',
      timePassed: 0,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
      likes: 0,
      dislikedBy: [],
      likedBy: [],
    };
    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (!user) {
          this.router.navigate(['/']);
        }
      });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Drawmap1.ogg';
    audio.load();
    audio.play();
  }

  addTool() {
    this.tool;
    if (this.tool) {
      this.tool.name =
        this.tool.name.charAt(0).toUpperCase() + this.tool.name.slice(1);
      this.tool.createdBy = this.currentUserId =
        this.authService.getUserIdFromLocalStorage();

      this.subscription = this.toolService.create(this.tool).subscribe({
        next: (tool) => {
          this.playAudio();
          this.router.navigate(['/tools/', tool._id]);
          console.log('ToolAddComponent Tool added');
          console.log(this.tool);
        },
        error: (err) => console.error('An error occurred while trying to create a tool: ' + err),
      });
    }
  }
}
