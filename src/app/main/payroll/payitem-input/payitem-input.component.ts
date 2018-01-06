import { 
  ChangeDetectorRef,
  ViewChild, 
  Component, 
  Renderer, 
  ElementRef,
  Input, 
  Output, 
  EventEmitter, 
  SimpleChanges, 
  OnInit, 
  OnChanges,
  AfterViewInit 
} from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService, SessionService, OrgService, PayslipService, AlertService, EventbusService } from '../../../services';
import { Observable } from 'rxjs/Observable';
import { PayitemsResponse } from '../../../models/responses/payitems';

@Component({
  selector: 'payitem-input',
  templateUrl: './payitem-input.component.html',
  styleUrls: ['./payitem-input.component.scss']
})

export class PayitemInputComponent implements OnInit, OnChanges, AfterViewInit {
  
  private selectInputElRef: ElementRef;
  @ViewChild('selectInput') set selectInput(elRef: ElementRef) {
      this.selectInputElRef = elRef;
  }
  @Input('item') selected;
  @Output() itemSelected: EventEmitter<string> = new EventEmitter();
  @Output() itemCreated: EventEmitter<any> = new EventEmitter();
  selectorVisible: boolean = false;
  payitems$: Observable<PayitemsResponse>
  userSelection: any; 
  disabled: boolean = false;
  org: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer,
    private eventBus$: EventbusService,    
    private session: SessionService,
    private alert: AlertService,
    private payslips: PayslipService,
    private orgService: OrgService) { }

  showSelector() {
    this.selectorVisible = true;
    setTimeout(() => { 
      this.renderer.invokeElementMethod(this.selectInputElRef.nativeElement, 'focus');
    }, 0);

    if (!this.payitems$) this.payitems$ = this.orgService.getPayitems(this.org.id);
  }

  onPayItemChanged($event) {
    if ($event.target.value === 'new') {
      this.eventBus$.broadcast('payitem-modal:open', true);      
    } else {
      if (this.selected && this.selected.is_new) {
        this.create($event.target.value);
      } else {
        this.itemSelected.emit($event.target.value);
        this.update($event.target.value);
      }
    }
  }

  onFocusOut($event) {
    if (this.selectorVisible && !this.selected.is_new) this.selectorVisible = false;
    this.cdRef.detectChanges();
  }

  update(pay_item_id: string) {
    this.disabled = true;

    this.payslips.updateItem(this.selected.id, { pay_item_id })
      .subscribe(response => {
        this.disabled = false;
        this.alert.success('Payslip', 'Payslip item updated', { timeOut: 3000 });
      }, err => {
        this.disabled = false;
      })
  }

  create(pay_item_id: string) {
    this.disabled = true;
    const slipID = this.selected.pay_slip_id;
    
    this.payslips.addItem(slipID, this.selected, { include: 'item' })
      .subscribe(response => {
        this.disabled = false;
        this.selected = response.data;
        this.selected.is_new = false;
        this.selectorVisible = false;

        this.itemCreated.emit(this.selected);
        this.alert.success('Payslip', 'Payslip item added', { timeOut: 3000 });
      }, err => {
        this.disabled = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    
    this.eventBus$.subscribe('payitem-modal:created', payitem => {
      console.log(payitem);
    })
  }

  ngAfterViewInit() {
    if (this.selected.hasOwnProperty('is_new') && this.selected.is_new) {
      this.showSelector();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = changes.selected ? changes.selected.currentValue : this.selected;
  }
}
