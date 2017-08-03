import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCreateComponent } from './password-create.component';

describe('PasswordCreateComponent', () => {
  let component: PasswordCreateComponent;
  let fixture: ComponentFixture<PasswordCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
