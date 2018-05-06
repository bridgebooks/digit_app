import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkPaidButtonComponent } from './mark-paid-button.component';

describe('MarkPaidButtonComponent', () => {
  let component: MarkPaidButtonComponent;
  let fixture: ComponentFixture<MarkPaidButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkPaidButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkPaidButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
