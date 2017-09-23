import { Component, ViewChild, Input, Output,EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { TaxRate } from '../../../models/data/tax-rate';
import { ObjectUtils } from '../../../shared';
import { AlertService, TaxRateService } from '../../../services';

@Component({
  selector: 'app-taxrate-edit-modal',
  templateUrl: './taxrate-edit-modal.component.html',
  styleUrls: ['./taxrate-edit-modal.component.scss']
})
export class TaxrateEditModalComponent implements OnInit, OnChanges {

  @ViewChild('taxRateForm') form;
  @Input('rate') rate: TaxRate;
  @Output() onRateUpdated = new EventEmitter<any>();
  total_rate: number;
  modalVisible: boolean = false;
  processing: boolean = false;

  constructor(private alert: AlertService, private taxRateService: TaxRateService) { }

  updateTotalRate() {
    this.total_rate = 0;

    this.rate.components.data.forEach(comp => {
      this.total_rate += comp.value;
    })

    this.rate.value = this.total_rate;
  }

  save() {
    this.processing = true;
    const model = ObjectUtils.getDirtyValues(this.form)

    this.taxRateService.update(this.rate.id, model)
      .subscribe(response => {
        this.processing = false;
        this.modalVisible = false;
        this.alert.success('Tax rate', 'Tax rate updated successfully', { timeOut: 3000 })
        this.onRateUpdated.emit(true)
      },
      err => {
        this.processing = false;
      })
  }

  hideModal() {
    this.modalVisible = false;
    this.form.resetForm();
  }

  ngOnInit() {
    this.total_rate = this.rate.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rate = changes.rate ? changes.rate.currentValue : this.rate;
  }
}
