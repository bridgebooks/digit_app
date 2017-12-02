import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrunFormComponent } from './payrun-form.component';

describe('PayrunFormComponent', () => {
  let component: PayrunFormComponent;
  let fixture: ComponentFixture<PayrunFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrunFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrunFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
