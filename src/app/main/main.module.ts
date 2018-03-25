import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIdleModule } from '@ng-idle/core'
import { ClarityModule } from '@clr/angular';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { JwtService, AuthService, SessionService } from '../services';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgIdleModule.forRoot(),
        ClarityModule,
        SharedModule.forRoot(),
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        HeaderComponent,
    ],
    providers: [
        JwtService,
        AuthService,
        SessionService
    ]
})

export class MainModule {}
