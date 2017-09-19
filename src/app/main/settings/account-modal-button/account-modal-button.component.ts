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
import { AccountsService } from '../../../services';

@Component({
  selector: 'app-account-modal-button',
  templateUrl: './account-modal-button.component.html',
  styleUrls: ['./account-modal-button.component.scss']
})
export class AccountModalButtonComponent implements OnInit, OnChanges {

  @Input('org') org;

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

  constructor(private accountsService: AccountsService) { }

  save() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.model.org_id = changes.org.currentValue.id;
  }
}
