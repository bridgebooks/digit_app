import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrunComponent } from './payrun.component';

describe('PayrunComponent', () => {
  let component: PayrunComponent;
  let fixture: ComponentFixture<PayrunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
