import { Component, OnInit, OnDestroy } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  closed$ = new Subject<any>();
  showTabs = true; // <-- show tabs by default

  constructor(private router: Router) { }

  ngOnInit() {

    //hiding tab when in login and signup page.
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.closed$)
    ).subscribe((event: any) => {
      if (event.url === '/login') { //if in login page tab is not will show
        this.showTabs = false;
      }
      if(event.url === '/signup'){ //if in signup page tab is not will show
        this.showTabs = false;
      }
      if(event.url === '/home'){ //if in home page tab will show.
        this.showTabs = true;
      }
    });
  }

  ngOnDestroy() {
    this.closed$.next();
  }

}
