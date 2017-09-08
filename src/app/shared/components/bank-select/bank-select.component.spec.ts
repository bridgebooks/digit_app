import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSelectComponent } from './bank-select.component';

describe('BankSelectComponent', () => {
  let component: BankSelectComponent;
  let fixture: ComponentFixture<BankSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
