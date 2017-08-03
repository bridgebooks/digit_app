import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../models/responses/user';
import { Observable } from 'rxjs';


@Injectable()
export class SessionService {
  
  constructor(private localStorageService: LocalStorageService) { 
  }

  addUser(user: User) {
    return this.localStorageService.set('user.data', user);
  }

  getUser() {
    return this.localStorageService.get('user.data');
  }

  end() {
    this.localStorageService.remove('user.data');
    this.localStorageService.remove('user.token');
  }
}
