import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule.forRoot(),
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        SidenavComponent
    ]
})

export class MainModule {}