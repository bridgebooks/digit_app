import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications'

@Injectable()
export class AlertService {

  constructor(private _notificationService: NotificationsService) { }

  info(title: string, content: string, options: any) {
    return this._notificationService.info(title, content, options);
  }

  success(title: string, content: string, options: any) {
    return this._notificationService.success(title, content, options);
  }

  error(title: string, content: string, options: any) {
    return this._notificationService.error(title, content, options);
  }
}
