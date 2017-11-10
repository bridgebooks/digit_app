import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';
import { JwtService } from '../../services';
import * as _ from 'lodash';

@Directive({
    selector: '[canDo]'
})

export class CanDoDirective implements OnInit{

    @Input('action') action: string;
    @Input('actionable') actionable: any;
    
    constructor(private el: ElementRef, private renderer: Renderer, private jwtService: JwtService) {
    }

    ngOnInit() {
        if (!this.canDo()) 
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }

    private getUserJWT() {
        const jwt = this.jwtService.getToken();
        return jwt;
    }

    private canDo(): boolean {
        const userRoles = this.getUserJWT().acl;
        const id = this.getUserJWT().aud;
        const check = this.action.split(':');

        let canSee = false;

        if (check.length > 1) {
            let group = check[0];
            let action = check[1];

            userRoles.forEach(role => {
                canSee = role.permissions[group][action] === 1 ||
                    this.actionable.user_id === id ? true : false;
            })
        }

        return canSee;
    }
}