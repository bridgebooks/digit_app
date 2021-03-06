import { ViewChild, Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from '../../environments/environment';
import { MainNavigation } from './main.navigation';
import { EventbusService, JwtService, AuthService, SessionService } from '../services';
import { Subscription } from 'rxjs/Subscription';


import '@clr/icons/shapes/core-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/commerce-shapes';
import '@clr/icons/shapes/technology-shapes';
import { Modal } from '@clr/angular';
import { Subject } from 'rxjs/Subject';
import { WindowService } from '../services/window.service';

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
    securityCheckError: string;
    securityCheckFailCount: number = 0;

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
                const message = err.error ? err.error.message : 'Please check your password.'
                this.securityCheck$.next(message);
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
            if (check === true) {
                this.loginModalOpen = false;
                this.security.password = null;
                this.securityCheckFailCount = 0;
                this.securityCheckError = null;
            } else {
                this.securityCheckError = check;
                this.securityCheckFailCount++;
                if (this.securityCheckFailCount >= 3) this.logout();
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
