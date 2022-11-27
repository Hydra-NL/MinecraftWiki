import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tooledit',
  templateUrl: './tooledit.component.html',
})
export class ToolEditComponent implements OnInit {
  toolId: string = this.route.snapshot.params['id'];
  tool: Tool | undefined;
  subscription!: Subscription;

  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('ToolEditComponent constructor');
  }

  ngOnInit() {
    this.tool = this.toolService.getTool(this.toolId);
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Smithing_Table1.ogg';
    audio.load();
    audio.play();
    console.log('playAudio');
  }

  updateTool() {
    if (this.tool) {
      this.tool.lastUpdateDate = new Date();
      this.toolService.updateTool(this.tool);
      this.router.navigate(['/tools/' + this.toolId]);
      console.log('ToolEditComponent updateTool');
      console.log(this.tool);
      this.playAudio();
    } else {
      this.router.navigate(['/tools/' + this.toolId + '/edit']);
    }
  }
}
