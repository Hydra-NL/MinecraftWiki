import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tool } from 'src/app/domain/models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/domain/models/user/user.model';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
})
export class ToolComponent {
  tools: Tool[] = [];
  subscription!: Subscription;
  currentUser: User | undefined;

  constructor(
    private toolService: ToolService,
    private authService: AuthService
  ) {
    console.log('ToolService constructor');
  }

  ngOnInit() {
    this.subscription = this.toolService.list().subscribe({
      next: (tools) => {
        this.tools = tools!;
        console.log(this.tools);
        console.log('Tools length: ' + this.tools.length);
      },
      error: (err) => {
        console.log('An error occured while retrieving the tools: ' + err);
      },
    });

    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        if (user) {
          this.currentUser = user!;
        }
      });
  }
}
