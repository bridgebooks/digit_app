import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tax-component-form',
  templateUrl: './tax-component-form.component.html',
  styleUrls: ['./tax-component-form.component.scss']
})
export class TaxComponentFormComponent implements OnInit, OnChanges {
  signPostPosition: string = 'top-middle';
  
  @ViewChild('componentForm') form;
  @Input('showCompound') showCompound: boolean;
  @Output() onComponentAdded = new EventEmitter<any>();

  model: any = {
    name: null,
    compound: false,
    value: null
  }

  constructor() { }

  save() {
    const model = Object.assign({}, this.model)
    this.onComponentAdded.emit(model);
    this.form.resetForm();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.showCompound = changes.showCompound ? changes.showCompound.currentValue : false
  }
}
