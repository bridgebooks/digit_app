import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayitemInputComponent } from './payitem-input.component';

describe('PayitemInputComponent', () => {
  let component: PayitemInputComponent;
  let fixture: ComponentFixture<PayitemInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayitemInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayitemInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
