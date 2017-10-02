import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-invoice-editor',
  templateUrl: './invoice-editor.component.html',
  styleUrls: ['./invoice-editor.component.scss']
})

export class InvoiceEditorComponent implements OnInit, OnChanges {
  @Input('type') type;
  @Input('org') org;
  @Input('editing') editing: boolean;
  @Input('saving') saving: boolean;
  @Input('model') model;
  @Output() onSaveInvoice = new EventEmitter<any>();

  datePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd'
  }

  raisedAtDate: IMyDate = { year: 0, month: 0, day: 0 };

  private modelDefaults =  {
    org_id: null,
    contact_id: null,
    type: this.type,
    invoice_no: null,
    reference: null,
    due_at: null,
    raised_at: null,
    line_amount_type: 'exclusive',
    items: [],
    status: 'draft',
    sub_total: 0.00,
    tax_total: 0.00,
    total: 0.00
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
    this.model.line_amount_type = $event;
    this.computeTax()
    this.computeTotal()
  }

  onContactSelect($event) {
    this.model.contact_id = $event.id;
  }
  
  onRaisedAtDateChanged($event: IMyDateModel) {
    this.model.raised_at = $event.formatted;
    this.raisedAtDate = $event.date;
  }

  onItemChanged($event) {
    this.computeSubTotal();
    this.computeTax();
    this.computeTotal();
  }

  computeSubTotal() {
    let total = 0;

    this.model.items.map(item => {
      total = total + item.amount;
    })

    this.model.sub_total = total;
  }

  computeTax() {
    let total = 0;

    this.model.items.map(item => {
      if (item.tax_rate) {
        switch (this.model.line_amount_type) {
          case 'inclusive':
            total = total + ( item.amount - ( item.amount / ((item.tax_rate.value/100) + 1)) )
            break;
          case 'exclusive':
            total = total + (item.tax_rate.value / 100) * item.amount;
            break;
          case 'no_tax':
            total = 0;
            break;
          
          default:
            total = total + (item.tax_rate.value / 100) * item.amount;
            break;
        }
      }
    })

    this.model.tax_total = total;
  }

  computeTotal() {
    switch (this.model.line_amount_type) {
      case 'inclusive':
        this.model.total = this.model.sub_total;
        break;
      case 'exclusive':
        this.model.total = this.model.sub_total + this.model.tax_total;
        break;
      case 'no_tax':
        this.model.total = this.model.sub_total;
        break;
      
      default:
        this.model.total = this.model.sub_total + this.model.tax_total;
        break;
    }
  }

  addLineItems(count: number = 1) {
    for (let i = 0; i < count; i++) {
      this.model.items.push({
        row_order: i,
        item_id: null,
        description: null,
        quantity: null,
        unit_price: null,
        discount: null,
        account_id: null,
        tax_rate_id: null,
        amount: null
      })
    }
  }

  save(status: string = 'draft') {
    this.model.status = status;
    this.onSaveInvoice.emit(this.model);
  }

  ngOnInit() {
    if (!this.editing) {
      this.modelDefaults.org_id = this.org.id;
      this.modelDefaults.type = this.type;
      this.modelDefaults.raised_at = `${this.raisedAtDate.year}-${this.raisedAtDate.month}-${this.raisedAtDate.day}`;
      this.addLineItems();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.editing = changes.editing ? changes.editing.currentValue : this.editing;
    this.type = changes.type ? changes.type.currentValue : this.type;
    this.model = changes.model ? changes.model.currentValue : this.modelDefaults;
    this.saving = changes.saving ? changes.saving.currentValue : this.saving;
  }
}
