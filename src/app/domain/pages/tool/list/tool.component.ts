import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tool } from 'src/app/domain/models/tool/tool.model';
import { ToolService } from '../../../models/tool/tool.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
})
export class ToolComponent {
  tools: Tool[] = [];
  subscription!: Subscription;

  constructor(private toolService: ToolService) {
    console.log('ToolService constructor');
  }

  ngOnInit() {
    this.subscription = this.toolService.list().subscribe({
      next: (tools) => {
        this.tools = tools!;
        console.log(this.tools);
        console.log("Tools length: " + this.tools.length);
      },
      error: (err) => {
        console.log("An error occured while retrieving the tools: " + err);
      },
    });
  }
}
