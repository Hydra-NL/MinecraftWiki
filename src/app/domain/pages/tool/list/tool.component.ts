import { Component } from '@angular/core';
import { ToolService } from '../../../models/tool/tool.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
})
export class ToolComponent {
  tools: any[] = [];

  constructor(private toolService: ToolService) {
    console.log('ToolService constructor');
  }

  ngOnInit() {
    this.tools = this.toolService.getTools();
    console.log(this.tools);
  }
}
