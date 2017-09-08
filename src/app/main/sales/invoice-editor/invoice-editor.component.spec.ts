import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditorComponent } from './invoice-editor.component';

describe('InvoiceEditorComponent', () => {
  let component: InvoiceEditorComponent;
  let fixture: ComponentFixture<InvoiceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
