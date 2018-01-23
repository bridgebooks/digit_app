import { ViewChild, Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from '../../environments/environment';
import { MainNavigation } from './main.navigation';
import { EventbusService, JwtService, AuthService, SessionService } from '../services';
import { Subscription } from 'rxjs'

import '@clr/icons';
import '@clr/icons/shapes/core-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/commerce-shapes';
import '@clr/icons/shapes/technology-shapes';
import { Modal } from '@clr/angular';
import { Subject } from 'rxjs/Subject';
import { PubSubService } from 'angular2-pubsub';
import { WindowService, GlobalEventbusEvent } from '../services/window.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentInit, OnDestroy {

    nav = MainNavigation.NavItems
    navCollasped: boolean = false;

    user: any;
    org: any;
    security: any = {}
    securityCheck$: Subject<boolean> = new Subject();
    
    @ViewChild('logoutModal') logoutModal: Modal;
    @ViewChild('loginModal') loginModal: Modal;

    logoutProcessing: boolean = false;
    checking: boolean = false;
    loginModalOpen: boolean = false;

    aclAlertShow: boolean = false;
    
    aclErrorSub: Subscription;

    constructor(
        private idleMonitor: Idle,
        public router: Router, 
        public activatedRoute: ActivatedRoute,
        private windowRef: WindowService,
        private eventbus: EventbusService,
        private jwtService: JwtService, 
        private session: SessionService, 
        private authService: AuthService) {
        // configure idle state monitor
        this.idleMonitor.setIdle(environment.idleTime);
        this.idleMonitor.setTimeout(environment.idleTimeout);
        this.idleMonitor.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        
        this.idleMonitor.onTimeout.subscribe(() => {
            if (!this.loginModal._open) this.loginModalOpen = true;
        })
    }

    securityCheck() {
        this.checking = true;

        this.authService
            .login(this.security)
            .subscribe(response => {
                this.jwtService.saveToken(response.data.token);
                this.idleMonitor.watch();
                this.securityCheck$.next(true);
            }, err => {
                this.checking = false;
                this.securityCheck$.next(false);
            }, () => {
                this.checking = false;
            })
    }

    logout() {
        this.logoutProcessing = true;

        this.authService
            .logout()
            .subscribe(response => {
                if (response.status === 'success') {
                    this.logoutProcessing = false;
                    this.session.end();
                    this.logoutModal.close();
                    this.idleMonitor.stop();
                    this.router.navigate(['/login'])
                }
            },
            err => {
                this.logoutProcessing = false;
                this.logoutModal.close();
            })
    }

    ngOnInit() {
        this.org = this.session.getDefaultOrg()
        this.user = this.session.getUser();
        this.security.email = this.user.email;

        this.idleMonitor.watch();

        this.aclErrorSub = this.eventbus.subscribe('acl:error', (payload) => {
            this.aclAlertShow = true;
            setTimeout(() => { this.aclAlertShow = false; }, 5000);
        })

        this.securityCheck$.subscribe(check => {
            if (check) {
                this.loginModalOpen = false;
                this.security.password = null;
            } else {
                this.logout();
            }
        })
        
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
        this.aclErrorSub.unsubscribe();
        this.securityCheck$.unsubscribe();
    }
}