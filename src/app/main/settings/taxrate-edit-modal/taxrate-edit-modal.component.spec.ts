import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxrateEditModalComponent } from './taxrate-edit-modal.component';

describe('TaxrateEditModalComponent', () => {
  let component: TaxrateEditModalComponent;
  let fixture: ComponentFixture<TaxrateEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxrateEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxrateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
