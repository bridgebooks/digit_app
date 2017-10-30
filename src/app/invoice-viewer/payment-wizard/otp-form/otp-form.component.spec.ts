import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpFormComponent } from './otp-form.component';

describe('OtpFormComponent', () => {
  let component: OtpFormComponent;
  let fixture: ComponentFixture<OtpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
