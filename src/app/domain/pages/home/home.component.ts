import { Component, OnDestroy, OnInit } from '@angular/core';
import { MobService } from '../../models/mob/mob.service';
import { ToolService } from '../../models/tool/tool.service';
import { BlockService } from '../../models/block/block.service';
import { UserService } from '../../models/user/user.service';
import { User } from '../../models/user/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'ClientSide-Project';
  tools: any[] = [];
  mobs: any[] = [];
  blocks: any[] = [];
  subs: User[] = [];
  users: User[] = [];
  currentUser: User | undefined;
  feed: any[] = [];
  fyp: any[] = [];
  date: Date = new Date();
  results: boolean = false;
  creator!: User;
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
    private authService: AuthService
  ) {
    console.log('HomeComponent constructor');
  }

  ngOnInit() {
    // Moet current user worden
    this.subscription = this.authService
      .getUserFromLocalStorage()
      .subscribe((user) => {
        this.currentUser = user;
        console.log('currentUser', this.currentUser?.username);
      });

    this.subscription = this.userService.list().subscribe({
      next: (users) => {
        this.users = users!;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].subscriptions.includes(this.currentUser?._id!)) {
            this.subs.push(this.users[i]);
          }
        }
      },
    });

    // Get all entities
    this.route.params.subscribe(() => {
      this.subscription = this.mobService.list().subscribe({
        next: (mobs) => {
          this.mobs = mobs!;
          for (let i = 0; i < this.mobs.length; i++) {
            this.subscription = this.userService
              .read(this.mobs[i].createdBy)
              .subscribe({
                next: (user) => {
                  this.creator = user;
                  this.mobs[i].creator = this.creator;
                },
              });
            this.feed.push(this.mobs[i]);
            this.calcTime();
          }
          this.subscription = this.toolService.list().subscribe({
            next: (tools) => {
              this.tools = tools!;

              for (let i = 0; i < this.tools.length; i++) {
                this.subscription = this.userService
                  .read(this.tools[i].createdBy)
                  .subscribe({
                    next: (user) => {
                      this.creator = user;
                      this.tools[i].creator = this.creator;
                    },
                  });
                this.feed.push(this.tools[i]);
                this.calcTime();
              }
              this.subscription = this.blockService.list().subscribe({
                next: (blocks) => {
                  this.blocks = blocks!;
                  for (let i = 0; i < this.blocks.length; i++) {
                    this.subscription = this.userService
                      .read(this.blocks[i].createdBy)
                      .subscribe({
                        next: (user) => {
                          this.creator = user;
                          this.blocks[i].creator = this.creator;
                        },
                      });
                    this.feed.push(this.blocks[i]);
                    this.calcTime();
                    try {
                      this.sortFeed();
                    } catch (e) {
                      console.log(e);
                    }
                  }
                },
                error: (err) => {
                  console.log(
                    'An error occured while retrieving the tools: ' + err
                  );
                },
              });
            },
            error: (err) => {
              console.log('An error occured while retrieving the mobs: ' + err);
            },
          });
        },
        error: (err) => {
          console.log('An error occured while retrieving the blocks: ' + err);
        },
      });
    });

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
      this.results = true;
    } else {
      this.results = false;
      for (let i = 0; i < this.currentUser!.subscriptions.length; i++) {
        this.subs.push(
          this.userService.getUserById(this.currentUser!.subscriptions[i])
        );
      }
    }
    console.log(searchValue);
  }

  unsubscribe(id: string) {
    let unsub = this.userService.getUserById(id);
    this.userService.subscribeToUser(this.currentUser!, unsub._id!);
    for (let i = 0; i < this.currentUser!.subscriptions.length; i++) {
      this.subs.push(
        this.userService.getUserById(this.currentUser!.subscriptions[i])
      );
    }
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
