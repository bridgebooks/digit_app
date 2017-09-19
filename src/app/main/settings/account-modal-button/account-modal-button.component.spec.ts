import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountModalButtonComponent } from './account-modal-button.component';

describe('AccountModalButtonComponent', () => {
  let component: AccountModalButtonComponent;
  let fixture: ComponentFixture<AccountModalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountModalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountModalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
