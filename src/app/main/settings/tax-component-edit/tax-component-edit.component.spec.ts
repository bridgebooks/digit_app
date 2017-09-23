import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComponentEditComponent } from './tax-component-edit.component';

describe('TaxComponentEditComponent', () => {
  let component: TaxComponentEditComponent;
  let fixture: ComponentFixture<TaxComponentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxComponentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxComponentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
