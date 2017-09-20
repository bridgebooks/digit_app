import { 
  Component, 
  ViewChild, 
  Input, 
  Output, 
  EventEmitter, 
  SimpleChanges,
  OnInit,
  OnChanges 
} from '@angular/core';
import { TaxRate } from '../../../models/data/tax-rate';

@Component({
  selector: 'app-tax-rate-modal',
  templateUrl: './tax-rate-modal.component.html',
  styleUrls: ['./tax-rate-modal.component.scss']
})

export class TaxRateModalComponent implements OnInit, OnChanges {

  @Input('org') org;

  modalVisible: boolean = false;
  processing: boolean = false;

  model: any = {
    name: null,
    components: []
  };

  constructor() { }

  save() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.org) this.org = changes.org.currentValue;
  }
}
