import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface GlobalEventbusEvent {
  pattern: string;
  payload: any;
}

interface CustomWindow extends Window {
  eventbus: Subject<GlobalEventbusEvent>;
}

declare let window: CustomWindow;

function getWindow() : any {
  window.eventbus = new Subject();
  return window;
}

@Injectable()
export class WindowService {
  constructor() {
  }

  get nativeWindow (): any {
    return getWindow();
  }
}
