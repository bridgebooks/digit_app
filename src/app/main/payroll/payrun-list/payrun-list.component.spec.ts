import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrunListComponent } from './payrun-list.component';

describe('PayrunListComponent', () => {
  let component: PayrunListComponent;
  let fixture: ComponentFixture<PayrunListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrunListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
