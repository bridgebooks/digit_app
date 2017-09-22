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
import { AlertService, TaxRateService } from '../../../services';
import { TaxRate } from '../../../models/data/tax-rate';

interface TaxRateModel {
  name: string;
  org_id: string;
  is_system: boolean;
  components: TaxComponent[];
}

interface TaxComponent {
  name: string;
  value: number;
  compound: boolean;
}

@Component({
  selector: 'app-tax-rate-modal',
  templateUrl: './tax-rate-modal.component.html',
  styleUrls: ['./tax-rate-modal.component.scss']
})

export class TaxRateModalComponent implements OnInit, OnChanges {
  @ViewChild('taxForm') form;
  @Input('org') org;

  @Output() onTaxRateSaved = new EventEmitter<any>();

  modalVisible: boolean = false;
  processing: boolean = false;
  total_rate: number = 0;

  model: TaxRateModel = {
    name: null,
    org_id: null,
    is_system: false,
    components: []
  };

  constructor(private alert: AlertService, private taxRateService: TaxRateService) { }

  onModalClosed($event) {
    this.form.resetForm(); 
    this.model.components = [];
    this.total_rate = 0;   
  }

  hideModal() {
    this.form.resetForm();
    this.model.components = [];
    this.total_rate = 0;
    this.modalVisible = false;
  }

  addComponent(component) {
    this.model.components.push(component)
    this.updateTotalTaxRate()
  }

  updateTotalTaxRate() {
    let total = 0;
    this.model.components.map((comp) => {
      total += total + comp.value;
    })

    this.total_rate = total;
  }

  save() {
    this.processing = true;
    this.model.org_id = this.org.id;

    this.taxRateService
      .create(this.model)
      .subscribe(response => {
        this.processing = false;
        this.onTaxRateSaved.emit(true);
        this.alert.success('Tax Rate', 'Tax rate succesfully created', { timeOut: 3000 });
        this.hideModal();
      },
      err => {
        this.processing = false;
      })
  }

  ngOnInit() {
    console.log(this.org)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.org) this.org = changes.org.currentValue;
  }
}
