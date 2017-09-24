import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountEditModalComponent } from './bank-account-edit-modal.component';

describe('BankAccountEditModalComponent', () => {
  let component: BankAccountEditModalComponent;
  let fixture: ComponentFixture<BankAccountEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
