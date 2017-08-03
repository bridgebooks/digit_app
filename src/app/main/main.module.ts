import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { MainRoutingModule } from './main-routing.module';

import { JwtService, AuthService, SessionService } from '../services';

import { MainComponent } from './main.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule.forRoot(),
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        HeaderComponent,
        SidenavComponent
    ],
    providers: [
        JwtService,
        AuthService,
        SessionService
    ]
})

export class MainModule {}