import { ViewChild, Component, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'payment-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('form') form: ControlContainer;
  @Output() formValid: EventEmitter<boolean> = new EventEmitter();
  formValid$: Subscription;

  model: any = {
    first_name: null,
    last_name: null,
    phone: null,
    email: null
  }
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.formValid$ = this.form.statusChanges
      .distinctUntilChanged()
      .subscribe(state => {
        const valid = state === 'VALID' ? true : false;
        this.formValid.emit(valid);
      });
  }

  ngOnDestroy() {
    this.formValid$.unsubscribe();
  }
}
