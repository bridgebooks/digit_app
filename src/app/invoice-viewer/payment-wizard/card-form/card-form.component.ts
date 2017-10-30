import { Component, ViewChild, Output, EventEmitter, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('form') form: ControlContainer;
  @Output() formValid: EventEmitter<boolean> = new EventEmitter();
  formValid$: Subscription;  

  card: any = {
    background: '#002538'
  }

  model: any = {
    card_no: null,
    cvv: null,
    expiry: null,
    pin: null
  }

  constructor() { 
  }

  transformModel() {
    let model: any = {}
    let expiration = this.model.expiry.split('/');

    model.card_no = this.model.card_no.replace(/\s/g, '').trim()
    model.cvv = this.model.cvv;
    model.expiry_month = expiration[0].replace(/\s/g, '').trim()
    model.expiry_year = expiration[1].replace(/\s/g, '').trim()
    model.pin = this.model.pin;

    return model;
  }

  onPinValueSet($event: string) {
    this.model.pin = $event;
  }

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
