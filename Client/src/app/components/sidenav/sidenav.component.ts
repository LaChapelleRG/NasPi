import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit, NgZone, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  private mobileQuery: MediaQueryList;
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private _mobileQueryListener: () => void;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              zone: NgZone,
              private router: Router) { 
    
                this.mobileQuery = media.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
