import { ViewChild, Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../../services/index';
import { UserSubscription } from '../../../models/data/subscription';
import { PlanPickerComponent } from '../plan-picker/plan-picker.component';
import { SubscriptionPlan } from '../../../models/data/subscription-plan';
import { Modal } from '@clr/angular';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  @ViewChild('planPicker') planPicker: PlanPickerComponent
  @ViewChild('cancelModal') cancelModal: Modal;
  loading: boolean = true;
  processing: boolean = false;
  subscription: UserSubscription;
  
  constructor(
    private alert: AlertService,
    private userService: UserService
  ) { }

  planSelected($event: SubscriptionPlan) {
    this.processing = true;
    this.userService
      .newSubscription({ plan: $event.name }, { include: 'plan' })
      .subscribe(response => {
        this.processing = false;
        if (response.data.hasOwnProperty('authorization_url')) {
          window.open(response.data.authorization_url, 'PaystackWindow');
        } else {
          this.subscription = response.data;
        }
      }, err => {
        this.processing = false;
        this.cancelModal.close();
      })
  }

  cancelSubscription() {
    this.processing = true;
    this.userService
      .cancelSubscription({ include: 'plan' })
      .subscribe(response => {
        if (response.status === 'success') {
          this.alert.success('Cancel Subscription', response.message, {
            timeOut: 3000
          })
          this.getBilling();
          this.processing = false;
          this.cancelModal.close();
        }
      }, err => {
        this.processing = false;
      })
  }

  getBilling() {
    this.userService
      .getBilling({ include: 'plan' })
      .subscribe(response => {
        this.loading = false;
        this.subscription = response.data;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.getBilling();
  }

}
