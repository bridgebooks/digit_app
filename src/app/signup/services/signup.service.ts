import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class SignupService {

    constructor(private localStorageService: LocalStorageService) {}

    setUser(data) {
        this.localStorageService.set('user.new', data);
    }

    getUser() {
        return this.localStorageService.get('user.new');
    }

    clearUser(): void {
        this.localStorageService.remove('user.new');
    }
}