import { Component, OnDestroy, OnInit } from '@angular/core';
import { MobService } from '../../models/mob/mob.service';
import { ToolService } from '../../models/tool/tool.service';
import { BlockService } from '../../models/block/block.service';
import { UserService } from '../../models/user/user.service';
import { RandomUserService } from '../user/rnduser.service';
import { RndUser } from '../user/rnduser.model';
import { User } from '../../models/user/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

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
  currentUser: User | undefined;
  feed: any[] = [];
  fyp: any[] = [];
  date: Date = new Date();
  results: boolean = false;
  user!: User;
  visible: boolean = true;
  subscription!: Subscription;

  randomUsers: any[] = [];

  constructor(
    private mobService: MobService,
    private toolService: ToolService,
    private blockService: BlockService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private randomUserService: RandomUserService
  ) {
    console.log('HomeComponent constructor');
  }

  ngOnInit() {
    // Moet current user worden
    this.currentUser = this.userService.getUserById('2');
    console.log(this.user);
    this.mobs = this.mobService.getMobs();
    this.tools = this.toolService.getTools();
    this.blocks = this.blockService.getBlocks();
    this.users = this.userService.getUsers();
    this.randomUserService.getRandomUsers().subscribe((data) => {
      this.randomUsers = data;
      console.log(this.randomUsers);
    });

    // Feed
    this.feed = [...this.mobs, ...this.tools, ...this.blocks];

    console.log(this.feed);

    try {
      this.calcTime();
      this.sortFeed();
    } catch (e) {
      console.log(e);
    }

    // FYP moet worden gebaseerd op de current user
    //FYP
    this.fyp = this.currentUser!.subscriptions;
    console.log(this.fyp);
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

  calcTime() {
    for (let i = 0; i < this.feed.length; i++) {
      let creationDate = this.feed[i].creationDate;
      this.feed[i].creationDate_unix = moment(creationDate).unix();
      let now = moment();
      let creationDate_moment = moment(creationDate);
      let timePassed = now.diff(creationDate_moment, 'days');
      if (timePassed < 1) {
        timePassed = now.diff(creationDate_moment, 'hours');
        if (timePassed < 1) {
          timePassed = now.diff(creationDate_moment, 'minutes');
          if (timePassed < 1) {
            timePassed = now.diff(creationDate_moment, 'seconds');
            this.feed[i].timePassed = timePassed + 's';
          } else {
            this.feed[i].timePassed = timePassed + 'm';
          }
        } else {
          this.feed[i].timePassed = timePassed + 'h';
        }
      } else {
        this.feed[i].timePassed = timePassed + 'd';
      }
    }
  }

  sortFeed() {
    this.feed.sort((a, b) => {
      return b.creationDate_unix - a.creationDate_unix;
    });
  }

  like(id: string, like: boolean) {
    let i = parseInt(id);
    
    if (like) {
      this.feed[i].likes++;
    } else {
      this.feed[i].likes--;
    }
  }
}
