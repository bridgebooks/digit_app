import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../../services/index';
import { UserSubscription } from '../../../models/data/subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  loading: boolean = true;
  subscription: UserSubscription;
  
  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) { }

  cancelTrial() {
  }

  cancelSubscription() {
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
