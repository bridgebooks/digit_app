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

  ngAfterViewInit() {
    this.tour.startTour(DashboardTour);
    console.log(DashboardTour);
  }
}
