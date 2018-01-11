import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgedReceivablesComponent } from './aged-receivables.component';

describe('AgedReceivablesComponent', () => {
  let component: AgedReceivablesComponent;
  let fixture: ComponentFixture<AgedReceivablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgedReceivablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgedReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
