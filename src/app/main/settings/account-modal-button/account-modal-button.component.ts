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
  @Input('types') types: any[];
  @Input('rates') rates: TaxRate[];

  @Output() onAccountSaved = new EventEmitter();

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

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.org) this.model.org_id = changes.org.currentValue.id;
    if (changes.rates) this.rates = changes.rates.currentValue;
    if (changes.types) this.types = changes.types.currentValue;
  }
}
