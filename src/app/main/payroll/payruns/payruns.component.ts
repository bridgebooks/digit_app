import { ViewChild, Component, OnInit } from '@angular/core';
import { Modal } from 'clarity-angular';
import { PayrunService } from '../../../services';

@Component({
  selector: 'app-payruns',
  templateUrl: './payruns.component.html',
  styleUrls: ['./payruns.component.scss']
})
export class PayrunsComponent implements OnInit {

  @ViewChild('payrunModal') payrunModal: Modal;

  constructor(private payruns: PayrunService) { }

  ngOnInit() {
  }

}
