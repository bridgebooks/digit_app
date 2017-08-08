import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentInit {

    showSideNav: Boolean = false;
    sidenavMenu: String;
    
    constructor(public router: Router, public activatedRoute: ActivatedRoute) {
        this.setSidenavState();
     }

    setSidenavState() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(_ => this.router.routerState.root)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => { 
                this.showSideNav = event['showSideNav'];
                this.sidenavMenu = event['sidenavMenu'];
                console.log(this.sidenavMenu);
            });
    }
    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

    ngAfterContentInit() {
    }

}