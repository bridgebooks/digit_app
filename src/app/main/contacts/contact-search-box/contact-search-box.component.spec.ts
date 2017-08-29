import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSearchBoxComponent } from './contact-search-box.component';

describe('ContactSearchBoxComponent', () => {
  let component: ContactSearchBoxComponent;
  let fixture: ComponentFixture<ContactSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
