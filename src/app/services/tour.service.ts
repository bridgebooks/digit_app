import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import * as Hopscotch from 'hopscotch';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationEnd } from '@angular/router';
import { startsWith } from 'lodash';

export interface ITourDefinition extends TourDefinition {
  url: string;
}
@Injectable()
export class TourService {
  onClose$: Subject<TourDefinition> = new Subject();
  onEnd$: Subject<TourDefinition> = new Subject();
  private hopscotch;
  private config: HopscotchConfiguration = {
    showPrevButton: true,
    onClose: () => {
      this.onClose$.next(this.currentTour);
    },
    onEnd: () => {
      this.onEnd$.next(this.currentTour);
    }
  }
  private currentTour;

  constructor(private localStorage: LocalStorageService, private router: Router) {
    this.hopscotch = Hopscotch
    this.onClose$.subscribe(tour => this.onTourClose(tour));
    this.onEnd$.subscribe(tour => this.onTourEnd(tour));
    this.router.events.subscribe(event => {
      const tour = this.hopscotch.getCurrTour();
      if (event instanceof NavigationEnd) {
        if (tour) {
          if (event.url.indexOf(tour.url) !== -1)
            this.hopscotch.endTour(false);
        }
      }
    })
  }

  private onTourClose(tour: TourDefinition) {
    const last_step = this.hopscotch.getCurrStepNum();
    this.localStorage.set(tour.id, {
      state: 'closed',
      last_step
    });
  }

  private onTourEnd(tour: TourDefinition) {
    this.localStorage.set(tour.id, {
      state: 'ended'
    });
  }

  configure(options: HopscotchConfiguration) {
  }

  canShowTour(id: string) {
    const tourState = <any>this.localStorage.get(id);
    if (!tourState) return true;
    if (tourState.state === 'closed' || tourState.state === 'ended') return false;
  }

  getLastStep(id: string) {
    const tourState = <any>this.localStorage.get(id);
    if (!tourState) return 0;
    return tourState.last_step ? parseInt(tourState.last_step, 10) : 0
  }

  start(tourDef: ITourDefinition, force: boolean = false) {
    const canShow = this.canShowTour(tourDef.id);
    const stepNumber = this.getLastStep(tourDef.id);
    this.hopscotch.configure(this.config);
    if (canShow && !force) {
      this.hopscotch.startTour(tourDef, stepNumber);
    } else if (!canShow && force) {
      this.hopscotch.startTour(tourDef, stepNumber);
    }
    this.currentTour = this.hopscotch.getCurrTour();
  }

  getTour() {
    return this.currentTour;
  }
}
