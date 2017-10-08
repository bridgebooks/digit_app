import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgbankaccountSelectComponent } from './orgbankaccount-select.component';

describe('OrgbankaccountSelectComponent', () => {
  let component: OrgbankaccountSelectComponent;
  let fixture: ComponentFixture<OrgbankaccountSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgbankaccountSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgbankaccountSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
