import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  constructor() {
    console.log('NavComponent constructor');
  }

  ngOnInit() {
    console.log('NavComponent ngOnInit');
  }
}
