import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBulkActionDropdownComponent } from './contact-bulk-action-dropdown.component';

describe('ContactBulkActionDropdownComponent', () => {
  let component: ContactBulkActionDropdownComponent;
  let fixture: ComponentFixture<ContactBulkActionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactBulkActionDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBulkActionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
