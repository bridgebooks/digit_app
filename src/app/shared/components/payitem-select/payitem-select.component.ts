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

@Component({
  selector: 'payitem-select',
  templateUrl: './payitem-select.component.html',
  styleUrls: ['./payitem-select.component.scss']
})
export class PayitemSelectComponent implements OnInit {

  @Input('org') org;

  @Input('selected') selected;

  @Output() itemSelected = new EventEmitter<any>();

  data: any[];

  constructor(private orgService: OrgService) { }
  
  filterChanged(selected: string) {
    this.itemSelected.emit(selected)
  }

  ngOnInit() {
    this.selected = this.selected ? this.selected : -1;
    const options = {
      perPage: 50,
    }

    this.orgService
      .getPayitems(this.org.id, options)
      .subscribe(response => {
        this.data = response.data;
      })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.selected ? changes.selected.currentValue : this.selected;
  }
}
