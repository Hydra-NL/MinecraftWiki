import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  darkTheme: boolean = false;
  constructor() {
    console.log('NavComponent constructor');
  }

  ngOnInit() {
    console.log('NavComponent ngOnInit');
  }

  switchTheme() {
    if (!this.darkTheme) {
      document.body.classList.add('dark');
      this.darkTheme = true;
    } else {
      document.body.classList.remove('dark');
      this.darkTheme = false;
    }
    console.log(this.darkTheme);
  }
}
