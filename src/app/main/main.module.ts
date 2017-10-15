import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { MainRoutingModule } from './main-routing.module';

import { EventbusService, JwtService, AuthService, SessionService } from '../services';
import { MainComponent } from './main.component';
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
    ],
    providers: [
        EventbusService,
        JwtService,
        AuthService,
        SessionService
    ]
})

export class MainModule {}