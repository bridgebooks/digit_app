import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tax-bulk-action-dropdown',
  templateUrl: './tax-bulk-action-dropdown.component.html',
  styleUrls: ['./tax-bulk-action-dropdown.component.scss']
})
export class TaxBulkActionDropdownComponent implements OnInit, OnChanges {

  @Input('enabled') enabled: boolean;
  enableBtn: boolean = true;

  @Output() onDeleteOptionSelected = new EventEmitter<boolean>();

  constructor() { }

  deleteSelected() {
    this.onDeleteOptionSelected.emit(true);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.enabled = changes.enabled.currentValue;
    this.enableBtn = this.enabled ? false : true;
  }
}
