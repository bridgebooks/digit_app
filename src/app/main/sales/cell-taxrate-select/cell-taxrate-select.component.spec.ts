import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellTaxrateSelectComponent } from './cell-taxrate-select.component';

describe('CellTaxrateSelectComponent', () => {
  let component: CellTaxrateSelectComponent;
  let fixture: ComponentFixture<CellTaxrateSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellTaxrateSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellTaxrateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
