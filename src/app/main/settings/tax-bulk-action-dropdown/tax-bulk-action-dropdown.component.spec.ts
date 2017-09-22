import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBulkActionDropdownComponent } from './tax-bulk-action-dropdown.component';

describe('TaxBulkActionDropdownComponent', () => {
  let component: TaxBulkActionDropdownComponent;
  let fixture: ComponentFixture<TaxBulkActionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxBulkActionDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxBulkActionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
