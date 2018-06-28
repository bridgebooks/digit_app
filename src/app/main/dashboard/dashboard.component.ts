import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TourService } from '../../services';
import { DashboardTour } from './dashboard.tour';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private tour: TourService) { }

  ngOnInit() {
  }

  startTour(force: boolean = false) {
    this.tour.start(DashboardTour, force);
  }

  ngAfterViewInit() {
    this.startTour()
  }
}
