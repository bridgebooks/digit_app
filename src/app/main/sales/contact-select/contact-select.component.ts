import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SearchService } from '../../../services';

@Component({
  selector: 'app-contact-select',
  templateUrl: './contact-select.component.html',
  styleUrls: ['./contact-select.component.scss']
})

export class ContactSelectComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  search$: Observable<any>
  processing: boolean = false;
  data: any;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.search$ = this.searchService.search(this.searchTerm$, { index: 'contacts' });
    this.searchTerm$
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        if (term.length > 0) 
          this.processing = true;
        else
          this.processing = false;
      })

    this.search$.subscribe(result => {
        this.data = result.data;
        this.processing = false;
      },
      err => {
        this.processing = false;
      });
  }
}
