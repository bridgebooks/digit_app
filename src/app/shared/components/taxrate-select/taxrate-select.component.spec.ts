import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxrateSelectComponent } from './taxrate-select.component';

describe('TaxrateSelectComponent', () => {
  let component: TaxrateSelectComponent;
  let fixture: ComponentFixture<TaxrateSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxrateSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxrateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
