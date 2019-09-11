import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-view',
  template:
  `<div class="sirc-main-container">
    <app-header></app-header>
    <div class="sirc-page-container container pt-2 pb-2">
        <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  </div>`
})
export class GlobalViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
