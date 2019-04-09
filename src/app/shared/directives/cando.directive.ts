import { Directive, ElementRef, HostListener, Input, Renderer, OnInit } from '@angular/core';
import { JwtService } from '../../services';

@Directive({
// tslint:disable-next-line: directive-selector
    selector: '[canDo]'
})

export class CanDoDirective implements OnInit {

    @Input('action') action: string;
    @Input('actionable') actionable: any;

    constructor(private el: ElementRef, private renderer: Renderer, private jwtService: JwtService) {
    }

    ngOnInit() {
        if (!this.canDo()) this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
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
            const group = check[0];
            const action = check[1];

            userRoles.forEach(role => {
                const isOwner = this.actionable && this.actionable.user_id && this.actionable.user_id === id;
                canSee = role.permissions[group][action] === 1 || isOwner;
            })
        }

        return canSee;
    }
}
