import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineAmountTypeSelectComponent } from './line-amount-type-select.component';

describe('LineAmountTypeSelectComponent', () => {
  let component: LineAmountTypeSelectComponent;
  let fixture: ComponentFixture<LineAmountTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineAmountTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineAmountTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
