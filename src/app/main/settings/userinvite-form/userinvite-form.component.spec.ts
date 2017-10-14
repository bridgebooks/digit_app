import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinviteFormComponent } from './userinvite-form.component';

describe('UserinviteFormComponent', () => {
  let component: UserinviteFormComponent;
  let fixture: ComponentFixture<UserinviteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinviteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinviteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
