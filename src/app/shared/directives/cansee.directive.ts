import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';
import { JwtService } from '../../services';
import { intersection } from 'lodash';

@Directive({
    selector: '[canSee]'
})

export class CanseeDirective implements OnInit {

    @Input('allowed') allowed: string;

    constructor(private el: ElementRef, private renderer: Renderer, private jwtService: JwtService) {
    }

    ngOnInit() {
        if (!this.canSee()) this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }

    private getUserRolesACL(): string[] {
        const jwt = this.jwtService.getToken();
        const userRoles = []

        jwt.roles.forEach(role => userRoles.push(role.name));
        jwt.acl.forEach(role => userRoles.push(role.name));

        return userRoles;
    }

    private canSee(): boolean {
        const userRoles = this.getUserRolesACL();
        const allowedRoles = this.allowed.split(',');
        const canSee = intersection(allowedRoles, userRoles).length > 0 ? true : false;

        return canSee;
    }
}