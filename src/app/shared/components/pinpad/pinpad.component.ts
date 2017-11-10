import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { PinPadControls } from './control';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'pinpad',
  templateUrl: './pinpad.component.html',
  styleUrls: ['./pinpad.component.scss']
})

export class PinpadComponent implements OnInit {

  @Output() pinValueSet: EventEmitter<any> = new EventEmitter();
  controls = PinPadControls;
  pinInput: string[] = [];
  pinInput$: Subject<string> = new Subject;
  pin: string;

  numberSelect(value: string) {
    this.pinInput$.next(value);
    if (this.pinInput.length === 4) this.pinValueSet.emit(this.pin);
  }

  clear() {
    this.pinInput = [];
    this.pin = null;
  }

  del() {
    this.pinInput.pop();
    this.pin = this.pinInput.toString().replace(/\,/g, '');
  }

  action(action: string) {
    switch(action) {
      case 'clear':
        this.clear();
      break;
      case 'del':
        this.del();
      break;
    }
  }

  ngOnInit() {
    this.pinInput$
      .subscribe(value => {
        if (this.pinInput.length < 4) {
          this.pinInput.push(value);
          this.pin = this.pinInput.toString().replace(/\,/g, '');
        }
      })
  }
}
