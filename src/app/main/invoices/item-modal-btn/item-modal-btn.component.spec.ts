import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModalBtnComponent } from './item-modal-btn.component';

describe('ItemModalBtnComponent', () => {
  let component: ItemModalBtnComponent;
  let fixture: ComponentFixture<ItemModalBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemModalBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModalBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
