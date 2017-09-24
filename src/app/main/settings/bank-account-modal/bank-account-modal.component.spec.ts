import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountModalComponent } from './bank-account-modal.component';

describe('BankAccountModalComponent', () => {
  let component: BankAccountModalComponent;
  let fixture: ComponentFixture<BankAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
