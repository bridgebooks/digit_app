import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBulkActionDropdownComponent } from './account-bulk-action-dropdown.component';

describe('AccountBulkActionDropdownComponent', () => {
  let component: AccountBulkActionDropdownComponent;
  let fixture: ComponentFixture<AccountBulkActionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBulkActionDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBulkActionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
