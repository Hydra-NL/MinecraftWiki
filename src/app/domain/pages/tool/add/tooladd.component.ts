import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { ToolType } from '../../../models/tool/tool.model';
import { UserService } from 'src/app/domain/models/user/user.service';
import { User } from 'src/app/domain/models/user/user.model';
import { EntityType } from 'src/app/domain/models/entity/entity.model';

@Component({
  selector: 'app-tooladd',
  templateUrl: './tooladd.component.html',
})
export class ToolAddComponent implements OnInit {
  tool!: Tool;

  constructor(
    private toolService: ToolService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
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
      createdBy: new User(''),
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

  addTool() {
    this.tool;
    if (this.tool) {
      this.tool.name =
        this.tool.name.charAt(0).toUpperCase() + this.tool.name.slice(1);
        // Moet currentUser zijn
      this.tool.createdBy = this.userService.getUserById('8');
      this.tool.creationDate = new Date();
      this.tool.lastUpdateDate = new Date();
      this.toolService.addTool(this.tool);
      this.playAudio();
      this.router.navigate(['/tools/' + this.tool._id]);
      console.log('ToolAddComponent Tool added');
      console.log(this.tool);
    }
  }
}
