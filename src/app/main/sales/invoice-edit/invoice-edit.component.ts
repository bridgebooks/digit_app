import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  org: any;
  editing: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.editing = param.id ? true : false;
    })
  }

  ngOnDestroy() {
  }
}
