import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToolService } from '../../../models/tool/tool.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
})
export class ToolComponent {
  tools: any[] = [];
  subscription!: Subscription;

  constructor(private toolService: ToolService) {
    console.log('ToolService constructor');
  }

  ngOnInit() {
    this.subscription = this.toolService.list().subscribe({
      next: (tools) => {
        this.tools = tools!;
        console.log(this.tools);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
