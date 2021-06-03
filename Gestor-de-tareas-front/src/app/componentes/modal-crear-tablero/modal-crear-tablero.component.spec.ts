import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearTableroComponent } from './modal-crear-tablero.component';

describe('ModalCrearTableroComponent', () => {
  let component: ModalCrearTableroComponent;
  let fixture: ComponentFixture<ModalCrearTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearTableroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
