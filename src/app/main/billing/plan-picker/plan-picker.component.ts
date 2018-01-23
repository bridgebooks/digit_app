import { ViewChild, Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Modal } from '@clr/angular';
import { SubscriptionPlan } from '../../../models/data/subscription-plan';
import { PlanService } from '../../../services/index';

@Component({
  selector: 'plan-picker',
  templateUrl: './plan-picker.component.html',
  styleUrls: ['./plan-picker.component.scss']
})
export class PlanPickerComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  plans: SubscriptionPlan[] = [];
  @ViewChild('modal') modal: Modal;
  @Input('current') currentPlan: SubscriptionPlan;
  @Output() selected: EventEmitter<SubscriptionPlan> = new EventEmitter();

  constructor(private planService: PlanService) { }

  selectPlan(plan: SubscriptionPlan) {
    this.selected.emit(plan);
    this.modal.close();
  }

  fetchPlans() {
    this.loading = true;

    this.planService.all()
      .subscribe(response => {
        this.loading = false;
        this.plans = response.data;
      }, err => {
        this.loading = false;
      })
  }

  ngOnInit() {
    this.modal._openChanged.subscribe(open => {
      if (open && this.plans.length < 1) {
        this.fetchPlans();
      }
    })
  }

  ngOnDestroy() {
    this.modal._openChanged.unsubscribe();
  }
}
