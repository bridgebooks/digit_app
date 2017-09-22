import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComponentFormComponent } from './tax-component-form.component';

describe('TaxComponentFormComponent', () => {
  let component: TaxComponentFormComponent;
  let fixture: ComponentFixture<TaxComponentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxComponentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxComponentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
