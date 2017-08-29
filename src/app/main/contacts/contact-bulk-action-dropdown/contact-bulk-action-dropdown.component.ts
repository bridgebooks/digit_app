import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contact-bulk-action-dropdown',
  templateUrl: './contact-bulk-action-dropdown.component.html',
  styleUrls: ['./contact-bulk-action-dropdown.component.scss']
})
export class ContactBulkActionDropdownComponent implements OnInit, OnChanges {
  @Input('enabled') enabled: boolean;
  enableBtn: boolean = true;

  @Output() onDeleteOptionSelected = new EventEmitter<boolean>();
  @Output() onAddtoGroupOptionSelected = new EventEmitter<boolean>();

  constructor() { }

  deleteSelected() {
    this.onDeleteOptionSelected.emit(true);
  }

  addtoGroupSelected() {
    this.onAddtoGroupOptionSelected.emit(true);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.enabled = changes.enabled.currentValue;
    this.enableBtn = this.enabled ? false : true;
  }
}
