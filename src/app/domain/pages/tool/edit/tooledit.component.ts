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
    this.subscription = this.toolService.read(this.toolId).subscribe({
      next: (tool) => {
        this.tool = tool;
        console.log(`Tool: ${this.tool._id}`);
      },
      error: (err) => {
        console.log('An error occurred while retrieving the tool: ' + err);
      },
    });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/Smithing_Table1.ogg';
    audio.load();
    audio.play();
    console.log('playAudio');
  }

  updateTool() {
    this.subscription = this.toolService.update(this.tool!).subscribe({
      next: (tool) => {
        this.tool = { ...tool };
        this.playAudio();
        this.router.navigate(['/tools/' + this.toolId]);
      },
    });
  }
}
