import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellItemSelectComponent } from './cell-item-select.component';

describe('CellItemSelectComponent', () => {
  let component: CellItemSelectComponent;
  let fixture: ComponentFixture<CellItemSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellItemSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellItemSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
