import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-invoice-editor',
  templateUrl: './invoice-editor.component.html',
  styleUrls: ['./invoice-editor.component.scss']
})

export class InvoiceEditorComponent implements OnInit, OnChanges {
  datePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  }

  lineItemsTableColumns: any[] = [
    { label: 'Item' },
    { label: 'Description' },
    { label: 'Qty' },
    { label: 'Unit Price' },
    { label: 'Disc %'},
    { label: 'Account' },
    { label: 'Tax Rate' },
    { label: 'Amount' }
  ]

  raisedAtDate: IMyDate = { year: 0, month: 0, day: 0 };

  model =  {
    due_at: null,
    raised_at: null,
    line_amount_type: null
  }

  constructor() { 
    let d: Date = new Date();
    this.raisedAtDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }

  onLineAmountTypeSelected($event) {
    console.log($event)
  }

  onContactSelect($event) {
    console.log($event);
  }
  
  onRaisedAtDateChanged(event: IMyDateModel) {
    this.raisedAtDate = event.date;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

  }
}
