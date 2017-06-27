import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSetupComponent } from './org-setup.component';

describe('OrgSetupComponent', () => {
  let component: OrgSetupComponent;
  let fixture: ComponentFixture<OrgSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
