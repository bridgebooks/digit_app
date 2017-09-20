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
import { AlertService, OrgService, AccountsService } from '../../../services';
import { TaxRate } from '../../../models/data/tax-rate';

@Component({
  selector: 'app-account-modal-button',
  templateUrl: './account-modal-button.component.html',
  styleUrls: ['./account-modal-button.component.scss']
})
export class AccountModalButtonComponent implements OnInit, OnChanges {

  @Input('org') org;

  @Output() onAccountSaved = new EventEmitter();

  rates: TaxRate[] = [];
  types: any[] = [];
  modalVisible: boolean = false;
  processing: boolean = false;

  model: any = {
    name: null,
    code: null,
    description: null,
    account_type_id: null,
    tax_rate_id: null,
    org_id: null
  }

  constructor(private alertService: AlertService, private orgService: OrgService, private accountsService: AccountsService) { }

  save() {
    this.processing = true;

    this.accountsService.create(this.model)
      .subscribe(response => {
        this.processing = false;
        this.modalVisible = false;
        this.onAccountSaved.emit(true);
        this.alertService.success('Account', 'Account created successfully', { timeOut: 3000 });
      }, err => {
        this.processing = false;
      })
  }

  fetchOrgTaxRates() {
    this.orgService.getTaxRates(this.org.id).subscribe(response => {
      this.rates = response.data
    })
  }

  fetchAccountTypes() {
    this.accountsService.types().subscribe(response => {
      this.types = response.data;
    });
  }

  ngOnInit() {
    this.fetchOrgTaxRates();
    this.fetchAccountTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.model.org_id = changes.org.currentValue.id;
  }
}
