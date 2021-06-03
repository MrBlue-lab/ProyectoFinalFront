import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColumnaComponent } from './modal-columna.component';

describe('ModalColumnaComponent', () => {
  let component: ModalColumnaComponent;
  let fixture: ComponentFixture<ModalColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColumnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
