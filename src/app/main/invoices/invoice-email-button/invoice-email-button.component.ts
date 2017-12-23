import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AlertService, SessionService, InvoiceService } from '../../../services';
import { DateFormatPipe } from 'angular2-moment'
import { Subject } from 'rxjs';
import '@clr/icons/shapes/social-shapes';

@Component({
  selector: 'invoice-email-button',
  templateUrl: './invoice-email-button.component.html',
  styleUrls: ['./invoice-email-button.component.scss']
})
export class InvoiceEmailButtonComponent implements OnInit {

  @Input('invoice') invoice;
  
  org: any;

  modalVisible: boolean = false;
  show: boolean;

  sending: boolean = false;
  sending$: Subject<any> = new Subject();

  model: any;

  template: 'invoice';

  templates: any[] = [
    { label: 'Invoice', value: 'invoice' },
    { label: 'Reminder', value: 'reminder' }
  ];

  private generateSubject(template: string = 'invoice') {
    let subject: string;
    if (template === 'invoice') {
      subject = `Invoice ${this.invoice.invoice_no} from ${this.org.name} for ${this.invoice.contact.data.name}`;
    } else {
      subject = `Overdue invoice reminder from ${this.org.name}`;
    }

    return subject;
  }

  private generateMessage(template: string = 'invoice') {
    let message: string;
    if (template === 'invoice') {
      message = `Hi ${this.invoice.contact.data.name},
      Here's invoice ${this.invoice.invoice_no} for ${this.invoice.total}.
      The amount outstanding of ${this.invoice.total} is due on ${this.dateFormatPipe.transform(this.invoice.due_at, 'D MMM YYYY')}.
      View and pay your bill online.
      If you have any questions, please let us know.
      Thanks,
      ${this.org.name}`;
    } else {
      message = `Hello
      Invoice ${this.invoice.invoice_no} to ${this.invoice.contact.data.name} Ltd now has ${this.invoice.total} overdue.
      The invoice was due payment by ${this.dateFormatPipe.transform(this.invoice.due_at, 'D MMM YYYY')} and we would really appreciate your prompt attention to this.
      Please get in touch if you'd like to discuss payment options or to query the invoice.
      To make things quicker for you, you can view and pay this invoice online.
      Thanks and we look forward to hearing from you,
      ${this.org.name}`;
    }
    return message;
  }

  onTemplateChange($event) {
    this.template = $event;
    this.model.subject = this.generateSubject($event);
    this.model.message = this.generateMessage($event)
  }

  send() {
    this.sending = true;
    this.invoices
      .send(this.invoice.id, this.model)
      .takeUntil(this.sending$)
      .subscribe(response => {
        this.modalVisible = false;
        this.alert.success('Invoice', 'Invoice message will be sent shortly', { timeOut: 3000 });
      },
      err => {
        this.sending = false;
      },
      () => {
        this.sending = false;
      })
  }

  cancel() {
    this.sending$.next();
    this.modalVisible = false;
  }

  constructor(
    private alert: AlertService, 
    private session: SessionService, 
    private invoices: InvoiceService, 
    private dateFormatPipe: DateFormatPipe
  ) { }

  ngOnInit() {
    this.org = this.session.getDefaultOrg();
    this.show = this.invoice.status === 'voided' ? false : true;    
    this.model = {
      to: this.invoice.contact.data.email || null,
      subject: this.generateSubject(),
      message: this.generateMessage(),
      send_copy: false,
      attach_pdf: false,
      mark_sent: true
    }
  }

}
