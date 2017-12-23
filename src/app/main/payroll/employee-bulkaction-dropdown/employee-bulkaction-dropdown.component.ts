import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../../../models/data/employee';

@Component({
  selector: 'employee-bulkaction-dropdown',
  templateUrl: './employee-bulkaction-dropdown.component.html',
  styleUrls: ['./employee-bulkaction-dropdown.component.scss']
})
export class EmployeeBulkactionDropdownComponent implements OnInit, OnChanges {
  @Input('enabled') enabled: boolean;
  @Input('selected') selection: Employee[];

  @Output() archiveSelected: EventEmitter<any> = new EventEmitter();
  @Output() deletedSelected: EventEmitter<any> = new EventEmitter();
  @Output() terminateSelected: EventEmitter<any> = new EventEmitter();
  @Output() restoreSelected: EventEmitter<any> = new EventEmitter();

  enableBtn: boolean = true;
  showRestoreOption: boolean = false;

  constructor() { }

  archive() {
    this.archiveSelected.emit(true);
  }

  delete() {
    this.deletedSelected.emit(true);
  }

  terminate() {
    this.deletedSelected.emit(true);
  }

  restore() {
    this.restoreSelected.emit(true);
  }

  ngOnInit() {
    this.showRestoreOption = this.selection.some(employee => employee.is_archived)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.enabled = changes.enabled ? changes.enabled.currentValue : this.enabled;
    this.enableBtn = this.enabled ? false : true;

    this.selection = changes.selection ? changes.selection.currentValue : this.selection;
    this.showRestoreOption = this.selection.some(employee => employee.is_archived)
  }

}
