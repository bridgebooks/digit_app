import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrunsComponent } from './payruns.component';

describe('PayrunsComponent', () => {
  let component: PayrunsComponent;
  let fixture: ComponentFixture<PayrunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
