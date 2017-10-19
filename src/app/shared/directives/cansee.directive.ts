import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';
import { JwtService } from '../../services';
import * as _ from 'lodash';

@Directive({
    selector: '[canSee]'
})

export class CanseeDirective implements OnInit{

    @Input('allowed') allowed: string;
    
    constructor(private el: ElementRef, private renderer: Renderer, private jwtService: JwtService) {
    }

    ngOnInit() {
        if (!this.canSee()) 
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }

    private getUserRoles(): string[] {
        const jwt = this.jwtService.getToken();
        const userRoles = []

        jwt.acl.forEach(role => userRoles.push(role.name))

        return userRoles;
    }

    private canSee(): boolean {
        const userRoles = this.getUserRoles();
        const allowedRoles = this.allowed.split(',');
        const canSee = _.intersection(allowedRoles, userRoles).length > 0 ? true : false;

        return canSee;
    }
}