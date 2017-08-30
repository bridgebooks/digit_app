import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../services';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-contact-search-box',
  templateUrl: './contact-search-box.component.html',
  styleUrls: ['./contact-search-box.component.scss']
})
export class ContactSearchBoxComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  data: any[] | any;
  total: number
  hideResults: boolean = true;

  constructor(private router: Router, private searchService: SearchService) { }

  reset() {
    this.data = null;
    this.total = null;
  }

  viewContact(id: string) {
    this.reset();
    this.router.navigate(['/contacts/view', id]);
  }

  onMouseleaveResultsBox($event) {
    this.hideResults = true
  }

  ngOnInit() {
    this.searchService
      .search(this.searchTerm$, { index: 'contacts' })
      .subscribe(result => {
        this.data = result.data;
        this.total = result.total;
        this.hideResults = false;
      });
  }
}
