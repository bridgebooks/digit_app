import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'cell-item-description',
  templateUrl: './cell-item-description.component.html',
  styleUrls: ['./cell-item-description.component.scss']
})
export class CellItemDescriptionComponent implements OnInit, OnChanges {

  @Input('description') description;

  hideTextarea: boolean = true;

  constructor() { }

  showTextarea() {
    this.hideTextarea = false;
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
  }
}
