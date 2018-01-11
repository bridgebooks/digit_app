import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgedPayablesComponent } from './aged-payables.component';

describe('AgedPayablesComponent', () => {
  let component: AgedPayablesComponent;
  let fixture: ComponentFixture<AgedPayablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgedPayablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgedPayablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
