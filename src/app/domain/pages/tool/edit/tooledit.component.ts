import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from '../../../models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/domain/models/user/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tooledit',
  templateUrl: './tooledit.component.html',
})
export class ToolEditComponent implements OnInit {
  toolId: string = this.route.snapshot.params['id'];
  tool: Tool | undefined;
  currentUser: User | undefined;
  subscription!: Subscription;

  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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
    this.authService.userMayEdit(this.tool?.createdBy!).subscribe({
      next: (mayEdit) => {
        if (!mayEdit) {
          window.alert('This is not your tool!');
          this.router.navigate(['/tools/' + this.toolId]);
        }
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
