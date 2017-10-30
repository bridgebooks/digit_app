import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { MainNavigation } from './main.navigation';
import { EventbusService, JwtService, AuthService, SessionService } from '../services';
import { Subscription } from 'rxjs'

import 'clarity-icons';
import 'clarity-icons/shapes/core-shapes';
import 'clarity-icons/shapes/commerce-shapes';
import 'clarity-icons/shapes/essential-shapes';
import 'clarity-icons/shapes/technology-shapes';

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
    
    logoutModalVisible: boolean = false;

    logoutProcessing: boolean = false;

    logoutBtnDisabled: boolean = false;

    aclAlertShow: boolean = false;

    aclErrorSub: Subscription;

    constructor(
        public router: Router, 
        public activatedRoute: ActivatedRoute,
        private eventbus: EventbusService,
        private jwtService: JwtService, 
        private session: SessionService, 
        private authService: AuthService) {
    }

    showLogoutModal() {
        this.logoutModalVisible = true;
    }

    hideLogoutModal() {
        this.logoutModalVisible = false;
    }

    logout() {
        this.logoutProcessing = true;
        this.logoutBtnDisabled = true;

        this.authService
            .logout()
            .subscribe(response => {
                if (response.status === 'success') {
                    this.logoutProcessing = false;
                    this.session.end();
                    this.hideLogoutModal();
                    this.router.navigate(['/login'])
                }
            },
            err => {
                this.logoutProcessing = false;
                this.logoutBtnDisabled = false;
                this.hideLogoutModal();
            })
    }

    ngOnInit() {
        this.org = this.session.getDefaultOrg()
        this.aclErrorSub = this.eventbus.subscribe('acl:error', (payload) => {
            this.aclAlertShow = true;
            setTimeout(() => { this.aclAlertShow = false; }, 5000);
        })
        
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

    ngAfterContentInit() {
    }

    ngOnDestroy() {
        this.aclErrorSub.unsubscribe();
    }
}