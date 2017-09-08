import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFornComponent } from './contact-forn.component';

describe('ContactFornComponent', () => {
  let component: ContactFornComponent;
  let fixture: ComponentFixture<ContactFornComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFornComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFornComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
