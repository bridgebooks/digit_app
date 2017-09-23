import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-account-bulk-action-dropdown',
  templateUrl: './account-bulk-action-dropdown.component.html',
  styleUrls: ['./account-bulk-action-dropdown.component.scss']
})
export class AccountBulkActionDropdownComponent implements OnInit, OnChanges {

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
