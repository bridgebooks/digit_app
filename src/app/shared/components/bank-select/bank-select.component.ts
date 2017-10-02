import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterContentInit, SimpleChanges } from '@angular/core';
import { BankService } from '../../../services';

@Component({
  selector: 'bank-select',
  templateUrl: './bank-select.component.html',
  styleUrls: ['./bank-select.component.scss'],
  providers: [BankService]
})
export class BankSelectComponent implements OnInit, OnChanges, AfterContentInit {
  @Input('selected') selected: string;

  banks: any[];

  @Output() onBankSelected = new EventEmitter();

  constructor(private bankService: BankService) { }

  filterChanged(selected: string) {
    this.onBankSelected.emit(selected);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) { 
  }

  ngAfterContentInit() {
    this.bankService.all().subscribe(response => {
      this.banks = response.data;
      this.banks.sort((a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      })
    })
  }
}
