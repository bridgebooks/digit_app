import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService, EventbusService } from '../../services';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ACLGuard implements CanActivate {

    constructor(private router: Router, private jwtService: JwtService, private eventbus: EventbusService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = this.jwtService.getToken();
        const userACL = token.acl;
        const role = route.data['acl'] as string;

        const parsedRole = role.split('.');
        const group = parsedRole[0];
        const action = parsedRole[1] ? parsedRole[1] : null;
        let allow = false;

        userACL.forEach(acl => {
            if (parsedRole.length > 0) {
                const test = !!acl.permissions[group][action] ? acl.permissions[group][action] : 0
                allow = Boolean(test)
            } else {
                if (!!acl.permissions[group] && acl.permissions[group] == 1) allow = true;
                allow = false;
            }
        })

        if (!allow) {
            this.eventbus.broadcast('acl:error', {});
        } 

        return allow;
    }
}