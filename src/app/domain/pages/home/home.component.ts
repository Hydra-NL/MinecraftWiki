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
  currentUserId: string = '';
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
    this.route.params.subscribe(() => {
      this.subscription = this.authService
        .getUserFromLocalStorage()
        .subscribe((user) => {
          if (user) {
            this.currentUserId = this.authService.getUserIdFromLocalStorage();
            this.subscription = this.userService
              .read(this.currentUserId)
              .subscribe({
                next: (user) => {
                  this.currentUser = user;
                  this.getSubscriptions();
                },
              });
          } else {
            console.log('No user found');
          }
        });

      this.subscription = this.userService.list().subscribe({
        next: (users) => {
          if (users == null) return;
          else {
            this.users = users!;
          }
        },
      });

      this.subscription = this.userService.list().subscribe({
        next: (users) => {
          if (users == null) return;
          else {
            this.users = users!;
          }
        },
      });
      this.getFeed();
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent ngOnDestroy');
  }

  async getFeed() {
    // Get all entities
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
          this.calcTime(true);
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
              this.calcTime(true);
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
                  this.calcTime(true);
                }
                try {
                  this.sortFeed();
                } catch (e) {
                  console.log(e);
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
    for (let i = 0; i < this.feed.length; i++) {
      if (this.feed[i].creator.subscribers.includes(this.currentUserId)) {
        this.fyp.push(this.feed[i]);
      }
    }
  }

  refreshFeed() {
    this.feed = [];
    this.fyp = [];
    this.getFeed();
  }

  getSubscriptions() {
    for (let i = 0; i < this.currentUser!.subscriptions.length; i++) {
      this.subscription = this.userService
        .read(this.currentUser!.subscriptions[i])
        .subscribe({
          next: (sub) => {
            this.subs.push(sub);
            console.log('Your subscriptions: ' + this.subs);
          },
        });
    }
  }

  refreshSubscriptions() {
    this.subs = [];
    this.getSubscriptions();
  }

  search() {
    let searchValue = (document.getElementById('search') as HTMLInputElement)
      .value;
    if (searchValue != '') {
      this.results = true;
      this.subs = this.subs.filter((item) => {
        return item.username.toLowerCase().includes(searchValue.toLowerCase());
      });
    } else {
      this.results = false;
      this.refreshSubscriptions();
    }
    console.log(searchValue);
  }

  unsubscribe(id: string) {
    console.log('Unsubscribing from: ' + id);
    this.subscription = this.userService
      .unsubscribe(this.currentUserId, id)
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.refreshSubscriptions();
        },
      });
  }

  toggle() {
    this.visible = !this.visible;
    this.refreshFeed();
  }

  calcTime(feed: boolean) {
    if (feed) {
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
    } else {
      for (let i = 0; i < this.fyp.length; i++) {
        let creationDate = this.fyp[i].creationDate;
        this.fyp[i].creationDate_unix = moment(creationDate).unix();
        let now = moment();
        let creationDate_moment = moment(creationDate);
        let timePassed = now.diff(creationDate_moment, 'days');
        if (timePassed < 1) {
          timePassed = now.diff(creationDate_moment, 'hours');
          if (timePassed < 1) {
            timePassed = now.diff(creationDate_moment, 'minutes');
            if (timePassed < 1) {
              timePassed = now.diff(creationDate_moment, 'seconds');
              this.fyp[i].timePassed = timePassed + 's';
            } else {
              this.fyp[i].timePassed = timePassed + 'm';
            }
          } else {
            this.fyp[i].timePassed = timePassed + 'h';
          }
        } else {
          this.fyp[i].timePassed = timePassed + 'd';
        }
      }
    }
  }

  sortFeed() {
    this.feed.sort((a, b) => {
      return b.creationDate_unix - a.creationDate_unix;
    });
  }

  like(itemId: string) {
    this.subscription = this.userService
      .like(this.currentUserId, itemId)
      .subscribe({
        next: () => {
          this.subscription = this.mobService.read(itemId).subscribe({
            next: (mob) => {
              if (mob && !mob.likedBy.includes(this.currentUserId)) {
                mob.likes++;
                mob.likedBy.push(this.currentUserId);
                if (mob.dislikedBy.includes(this.currentUserId)) {
                  mob.dislikedBy.splice(
                    mob.dislikedBy.indexOf(this.currentUserId),
                    1
                  );
                  mob.likes++;
                }
                this.subscription = this.mobService.update(mob).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              } else if (mob && mob.likedBy.includes(this.currentUserId)) {
                mob.likes--;
                mob.likedBy.splice(mob.likedBy.indexOf(this.currentUserId), 1);
                this.subscription = this.mobService.update(mob).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              }
            },
          });

          this.subscription = this.blockService.read(itemId).subscribe({
            next: (block) => {
              if (block && !block.likedBy.includes(this.currentUserId)) {
                block.likes++;
                block.likedBy.push(this.currentUserId);
                if (block.dislikedBy.includes(this.currentUserId)) {
                  block.dislikedBy.splice(
                    block.dislikedBy.indexOf(this.currentUserId),
                    1
                  );
                  block.likes++;
                }
                this.subscription = this.blockService.update(block).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              } else if (block && block.likedBy.includes(this.currentUserId)) {
                block.likes--;
                block.likedBy.splice(
                  block.likedBy.indexOf(this.currentUserId),
                  1
                );
                this.subscription = this.blockService.update(block).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              }
            },
          });

          this.subscription = this.toolService.read(itemId).subscribe({
            next: (tool) => {
              if (tool && !tool.likedBy.includes(this.currentUserId)) {
                tool.likes++;
                tool.likedBy.push(this.currentUserId);
                if (tool.dislikedBy.includes(this.currentUserId)) {
                  tool.dislikedBy.splice(
                    tool.dislikedBy.indexOf(this.currentUserId),
                    1
                  );
                  tool.likes++;
                }
                this.subscription = this.toolService.update(tool).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              } else if (tool && tool.likedBy.includes(this.currentUserId)) {
                tool.likes--;
                tool.likedBy.splice(
                  tool.likedBy.indexOf(this.currentUserId),
                  1
                );
                this.subscription = this.toolService.update(tool).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              }
            },
          });
        },
      });
  }

  dislike(itemId: string) {
    this.subscription = this.userService
      .dislike(this.currentUserId, itemId)
      .subscribe({
        next: () => {
          this.subscription = this.mobService.read(itemId).subscribe({
            next: (mob) => {
              if (mob && !mob.dislikedBy.includes(this.currentUserId)) {
                mob.likes--;
                mob.dislikedBy.push(this.currentUserId);
                if (mob.likedBy.includes(this.currentUserId)) {
                  mob.likedBy.splice(
                    mob.likedBy.indexOf(this.currentUserId),
                    1
                  );
                  mob.likes--;
                }
                this.subscription = this.mobService.update(mob).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              } else if (mob && mob.dislikedBy.includes(this.currentUserId)) {
                mob.likes++;
                mob.dislikedBy.splice(
                  mob.dislikedBy.indexOf(this.currentUserId),
                  1
                );
                this.subscription = this.mobService.update(mob).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              }
            },
          });

          this.subscription = this.blockService.read(itemId).subscribe({
            next: (block) => {
              if (block && !block.dislikedBy.includes(this.currentUserId)) {
                block.likes--;
                block.dislikedBy.push(this.currentUserId);
                if (block.likedBy.includes(this.currentUserId)) {
                  block.likedBy.splice(
                    block.likedBy.indexOf(this.currentUserId),
                    1
                  );
                  block.likes--;
                }
                this.subscription = this.blockService.update(block).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              } else if (
                block &&
                block.dislikedBy.includes(this.currentUserId)
              ) {
                block.likes++;
                block.dislikedBy.splice(
                  block.dislikedBy.indexOf(this.currentUserId),
                  1
                );
                this.subscription = this.blockService.update(block).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              }
            },
          });

          this.subscription = this.toolService.read(itemId).subscribe({
            next: (tool) => {
              if (tool && !tool.dislikedBy.includes(this.currentUserId)) {
                tool.likes--;
                tool.dislikedBy.push(this.currentUserId);
                if (tool.likedBy.includes(this.currentUserId)) {
                  tool.likedBy.splice(
                    tool.likedBy.indexOf(this.currentUserId),
                    1
                  );
                  tool.likes--;
                }
                this.subscription = this.toolService.update(tool).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              } else if (tool && tool.dislikedBy.includes(this.currentUserId)) {
                tool.likes++;
                tool.dislikedBy.splice(
                  tool.dislikedBy.indexOf(this.currentUserId),
                  1
                );
                this.subscription = this.toolService.update(tool).subscribe({
                  next: () => {
                    this.refreshFeed();
                  },
                });
              }
            },
          });
        },
      });
  }
}
