import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddColumnaComponent } from './modal-add-columna.component';

describe('ModalAddColumnaComponent', () => {
  let component: ModalAddColumnaComponent;
  let fixture: ComponentFixture<ModalAddColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddColumnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
