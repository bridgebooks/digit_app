import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    showSideNav: Boolean = false;
    sidenavMenu: String;

    constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

    setSidenavState() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }

                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => { 
                this.showSideNav = event['showSideNav'];
                this.sidenavMenu = event['sidenavMenu'];
            });
    }
    ngOnInit() {
        this.setSidenavState();

        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}