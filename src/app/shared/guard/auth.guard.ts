import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private jwtService: JwtService) { }

    canActivate() {
        if (!this.jwtService.checkToken()) {
            this.router.navigate(['/login']);
        }
        else {
            return true;
        }
        return true
    }
}