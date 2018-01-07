import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrunReviewComponent } from './payrun-review.component';

describe('PayrunReviewComponent', () => {
  let component: PayrunReviewComponent;
  let fixture: ComponentFixture<PayrunReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrunReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrunReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
