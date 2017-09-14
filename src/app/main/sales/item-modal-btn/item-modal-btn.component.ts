import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AlertService, SessionService, ItemService } from '../../../services';


@Component({
  selector: 'app-item-modal-btn',
  templateUrl: './item-modal-btn.component.html',
  styleUrls: ['./item-modal-btn.component.scss']
})
export class ItemModalBtnComponent implements OnInit {

  @ViewChild('itemForm') form;  
  @Output() onItemCreated = new EventEmitter();

  org: any;
  processing: boolean = false;
  modalVisible: boolean = false;
  model: any = {
    is_sold: true,
    is_purchased: true 
  };

  constructor(
    private alerts: AlertService,
    private session: SessionService,
    private itemService: ItemService) { }

  save() {
    this.processing = true;
    this.itemService
      .create(this.model)
      .subscribe(response => {
        this.onItemCreated.emit(true)
        this.processing = false;
        this.modalVisible = false;
        this.form.resetForm();
      }, 
      err => {
        this.processing = false;
      })
  }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.model.org_id = this.model.org_id || this.org.id;
  }
}
