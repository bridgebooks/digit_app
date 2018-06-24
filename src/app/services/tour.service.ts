import { Injectable } from '@angular/core';
import * as Hopscotch from 'hopscotch';
@Injectable()
export class TourService {
  private _options: HopscotchConfiguration;

  constructor() { }

  setOptions(options: HopscotchConfiguration) {
    this._options = options;
  }

  startTour(tour: TourDefinition, stepNumber?: number) {
  }

  endTour() {
  }
}
