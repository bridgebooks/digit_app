import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellItemDescriptionComponent } from './cell-item-description.component';

describe('CellItemDescriptionComponent', () => {
  let component: CellItemDescriptionComponent;
  let fixture: ComponentFixture<CellItemDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellItemDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
