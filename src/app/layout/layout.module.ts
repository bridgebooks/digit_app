import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        ClarityModule.forRoot(),
        LayoutRoutingModule
    ],
    declarations: [
        LayoutComponent
    ]
})

export class LayoutModule {}