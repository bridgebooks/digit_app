import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  SimpleChanges, 
  OnInit, 
  OnChanges 
} from '@angular/core';
import { OrgService } from '../../../services';
import { Account } from '../../../models/data/account';

@Component({
  selector: 'account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.scss']
})
export class AccountSelectComponent implements OnInit, OnChanges {

  @Input('org') org;

  @Input('selected') selected;

  @Output() onAccountSelected = new EventEmitter<any>();

  data: any[];

  constructor(private orgService: OrgService) { }
  
  filterChanged(selected: string) {
    this.onAccountSelected.emit(selected)
  }

  private transformData(data: any[]) {
    const hash = Object.create(null), result = [];
    
    data.
      map(account => {
        account.type = account.type.data.name
        return account
      })
      .map(account => {
        if (!hash[account['type']]) {
          hash[account['type']] = [];
        }

        hash[account['type']].push(account)
      });
    
    Object
      .keys(hash)
      .forEach(key => {
        result.push({
          name: key,
          children: hash[key]
        })
      })
    
    return result;
  }

  ngOnInit() {
    this.selected = this.selected ? this.selected : -1;
    const options = {
      ref: '',
      include: 'type',
      perPage: 150,
    }

    this.orgService
      .getAccounts(this.org.id, options)
      .subscribe(response => {
        this.data = this.transformData(response.data);
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.selected ? changes.selected.currentValue : this.selected;
  }
}
