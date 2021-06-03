import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTarjetaComponent } from './modal-tarjeta.component';

describe('ModalTarjetaComponent', () => {
  let component: ModalTarjetaComponent;
  let fixture: ComponentFixture<ModalTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
