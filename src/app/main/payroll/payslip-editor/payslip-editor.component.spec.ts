import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipEditorComponent } from './payslip-editor.component';

describe('PayslipEditorComponent', () => {
  let component: PayslipEditorComponent;
  let fixture: ComponentFixture<PayslipEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
