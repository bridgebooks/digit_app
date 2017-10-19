import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolePickerComponent } from './userrole-picker.component';

describe('UserrolePickerComponent', () => {
  let component: UserrolePickerComponent;
  let fixture: ComponentFixture<UserrolePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrolePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
