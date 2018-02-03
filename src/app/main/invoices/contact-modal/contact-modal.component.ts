import { ViewChild, Component, EventEmitter, OnInit } from '@angular/core';
import { Modal } from '@clr/angular';
import { ContactService } from '../../../services/index';
import { Contact } from '../../../models/data/contact';
import { ControlContainer } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent implements OnInit {

  @ViewChild('modal') modal: Modal;
  @ViewChild('form') form: ControlContainer;
  cancel$: Subject<any> = new Subject();
  model: any = {};
  saving: boolean = false;
  contactCreated: EventEmitter<Contact> = new EventEmitter;

  constructor(
    private contacts: ContactService
  ) { }

  save() {
    this.saving = true;

    this.contacts
      .add(this.model)
      .takeUntil(this.cancel$)
      .subscribe(response => {
        this.saving = false;
        this.contactCreated.emit(response.data);

        this.form.reset();
        this.modal.close();
      })
  }

  ngOnInit() {
    this.modal._openChanged.subscribe(open => {
      if (!open) {
        this.cancel$.next(true);
      }
    })
  }
}
