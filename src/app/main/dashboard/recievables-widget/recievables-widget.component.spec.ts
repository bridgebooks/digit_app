import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievablesWidgetComponent } from './recievables-widget.component';

describe('RecievablesWidgetComponent', () => {
  let component: RecievablesWidgetComponent;
  let fixture: ComponentFixture<RecievablesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievablesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievablesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
