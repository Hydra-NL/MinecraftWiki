import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MobService } from '../../models/mob/mob.service';
import { ToolService } from '../../models/tool/tool.service';
import { BlockService } from '../../models/block/block.service';
import { UserService } from '../../models/user/user.service';
import { User } from '../../models/user/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'ClientSide-Project';
  tools: any[] = [];
  mobs: any[] = [];
  blocks: any[] = [];
  users: any[] = [];
  feed: any[] = [];
  fyp: any[] = [];
  date: Date = new Date();
  results: boolean = false;
  user!: User;
  visible: boolean = true;

  constructor(
    private mobService: MobService,
    private toolService: ToolService,
    private blockService: BlockService,
    private userService: UserService
  ) {
    console.log('HomeComponent constructor');
  }

  ngOnInit() {
    this.user = this.userService.getUserById('2');
    console.log(this.user);
    this.mobs = this.mobService.getMobs();
    this.tools = this.toolService.getTools();
    this.blocks = this.blockService.getBlocks();
    this.users = this.userService.getUsers();

    // Feed
    this.feed = [...this.mobs, ...this.tools, ...this.blocks];

    console.log(this.feed);
    this.sortFeed();
    try {
      for (let i = 0; i < this.feed.length; i++) {
        this.feed[i].creationDate = this.calcTime(i, 'feed');
      }
    } catch (e) {
      console.log(e);
    }

    // FYP
    // this.fyp = [...this.mobs, ...this.tools, ...this.blocks];
    // for (let i = 0; i < this.fyp.length; i++) {
    //   this.fyp[i].creationDate = this.calcTime(i, 'fyp');
    // }
    // console.log(this.fyp);
    // this.fyp.sort((a, b) => {
    //   return b.creationDate - a.creationDate;
    // });
    // console.log(this.fyp);
    // this.fyp = this.fyp.filter((item) => {
    //   console.log('id: ' + item._id);
    //   return this.user.subscriptions.includes(item._id);
    // });
    // console.log(this.fyp);
  }

  ngOnDestroy(): void {
    console.log('HomeComponent ngOnDestroy');
  }

  search() {
    let searchValue = (document.getElementById('search') as HTMLInputElement)
      .value;
    if (searchValue != '') {
      this.users = this.users.filter((item) => {
        return item.username.toLowerCase().includes(searchValue.toLowerCase());
      });
      this.results = true;
    } else {
      this.results = false;
      this.users = this.userService.getUsers();
    }
    console.log(searchValue);
  }

  unsubscribe(id: string) {
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }

  toggle() {
    this.visible = !this.visible;
  }

  click() {
    console.log('click');
  }

  calcTime(index: number, list: string) {
    if (list == 'feed') {
      let diff = this.date.getTime() - this.feed[index].creationDate.getTime();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor(diff / (1000 * 60 * 60));
      let minutes = Math.floor(diff / (1000 * 60));
      let seconds = Math.floor(diff / 1000);
      if (days > 0) {
        return days + 'd';
      }
      if (hours > 0) {
        return hours + 'h';
      }
      if (minutes > 0) {
        return minutes + 'm';
      }
      if (seconds > 0) {
        return seconds + 's';
      }
    } else {
      let diff = this.date.getTime() - this.fyp[index].creationDate.getTime();
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor(diff / (1000 * 60 * 60));
      let minutes = Math.floor(diff / (1000 * 60));
      let seconds = Math.floor(diff / 1000);
      if (days > 0) {
        return days + 'd';
      }
      if (hours > 0) {
        return hours + 'h';
      }
      if (minutes > 0) {
        return minutes + 'm';
      }
      if (seconds > 0) {
        return seconds + 's';
      }
    }
    return '0s';
  }

  sortFeed() {
    this.feed.sort((a, b) => {
      return b.creationDate - a.creationDate;
    });
  }
}
