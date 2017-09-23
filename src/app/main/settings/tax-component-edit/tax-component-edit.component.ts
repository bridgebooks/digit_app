import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { TaxRateComponent } from '../../../models/data/tax-rate-component';
import { ObjectUtils } from '../../../shared';
import { AlertService, TaxRateService } from '../../../services';

@Component({
  selector: 'app-tax-component-edit',
  templateUrl: './tax-component-edit.component.html',
  styleUrls: ['./tax-component-edit.component.scss']
})
export class TaxComponentEditComponent implements OnInit, OnChanges {
  @ViewChild('componentForm') form: ControlContainer;

  @Input('component') component: TaxRateComponent;
  @Output() componentUpdated = new EventEmitter<any>();
  processing: boolean = false;

  constructor(private alert: AlertService, private taxRateService: TaxRateService) { }

  save(data: object) {
    this.processing = true;
    this.taxRateService
      .updateComponent(this.component.id, data)
      .subscribe(response => {
        this.component = response.data;
        this.processing = false;
        this.componentUpdated.emit(this.component)
        this.alert.success('Tax Component', 'Tax component updated', { timeOut: 3000 })
      },
      err => {
        this.processing = false;
      })
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.component = changes.component ? changes.component.currentValue : this.component;
  }
}
