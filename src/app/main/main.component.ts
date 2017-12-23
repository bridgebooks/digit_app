import { ViewChild, Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from '../../environments/environment';
import { MainNavigation } from './main.navigation';
import { EventbusService, JwtService, AuthService, SessionService } from '../services';
import { Subscription } from 'rxjs'

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';
import 'clarity-icons/shapes/commerce-shapes';
import 'clarity-icons/shapes/essential-shapes';
import 'clarity-icons/shapes/technology-shapes';
import { Modal } from 'clarity-angular';
import { Subject } from 'rxjs/Subject';

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
    securityCheck$: Subject<any> = new Subject();
    
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

        this.securityCheck$.subscribe(() => {
            this.loginModalOpen = false;
            this.security.password = null;
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