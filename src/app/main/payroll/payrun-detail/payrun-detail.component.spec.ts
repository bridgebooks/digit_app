import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrunDetailComponent } from './payrun-detail.component';

describe('PayrunDetailComponent', () => {
  let component: PayrunDetailComponent;
  let fixture: ComponentFixture<PayrunDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrunDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrunDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
