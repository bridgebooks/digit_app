import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayitemFormModalComponent } from './payitem-form-modal.component';

describe('PayitemFormModalComponent', () => {
  let component: PayitemFormModalComponent;
  let fixture: ComponentFixture<PayitemFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayitemFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayitemFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
