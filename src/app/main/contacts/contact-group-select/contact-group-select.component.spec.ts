import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGroupSelectComponent } from './contact-group-select.component';

describe('ContactGroupSelectComponent', () => {
  let component: ContactGroupSelectComponent;
  let fixture: ComponentFixture<ContactGroupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactGroupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactGroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
