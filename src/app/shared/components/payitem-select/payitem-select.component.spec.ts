import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayitemSelectComponent } from './payitem-select.component';

describe('PayitemSelectComponent', () => {
  let component: PayitemSelectComponent;
  let fixture: ComponentFixture<PayitemSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayitemSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayitemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
