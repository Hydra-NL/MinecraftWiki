import { Component } from '@angular/core';
import { MobService } from '../../models/mob/mob.service';

@Component({
  selector: 'app-mob',
  templateUrl: './mob.component.html',
})
export class MobComponent {
  mobs: any[] = [];

  constructor(private mobService: MobService) {
    console.log('MobComponent constructor');
  }

  ngOnInit() {
    this.mobs = this.mobService.getMobs();
    console.log(this.mobs);
  }
}
