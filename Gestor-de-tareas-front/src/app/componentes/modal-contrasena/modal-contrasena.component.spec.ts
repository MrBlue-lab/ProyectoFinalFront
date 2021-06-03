import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContrasenaComponent } from './modal-contrasena.component';

describe('ModalContrasenaComponent', () => {
  let component: ModalContrasenaComponent;
  let fixture: ComponentFixture<ModalContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalContrasenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
