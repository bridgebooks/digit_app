import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EventbusService, AlertService } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  toastOptions: any = {
      position: [ "top","right" ],
      preventDuplicates: true,
      lastOnBottom: false
  }

  constructor(
    private router: Router, 
    private alert: AlertService,
    private eventBus: EventbusService,
    private activatedRoute: ActivatedRoute, 
    private titleService: Title) {
  }

  setPageTitle() {
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
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }

  ngOnInit() {
    this.setPageTitle();

    this.eventBus.subscribe('billing:error', payload => {
      const toast = this.alert.error('Billing', payload.message, {
        timeOut: 10000,
        pauseOnHover: true,
        preventDuplicates: true
      })

      toast.click.subscribe(event => {
        this.router.navigate(['/billing/subscription']);
      })
    })
  }
}
