import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellAccountSelectComponent } from './cell-account-select.component';

describe('CellAccountSelectComponent', () => {
  let component: CellAccountSelectComponent;
  let fixture: ComponentFixture<CellAccountSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellAccountSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellAccountSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
