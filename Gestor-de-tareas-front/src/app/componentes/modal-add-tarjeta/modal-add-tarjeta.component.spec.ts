import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTarjetaComponent } from './modal-add-tarjeta.component';

describe('ModalAddTarjetaComponent', () => {
  let component: ModalAddTarjetaComponent;
  let fixture: ComponentFixture<ModalAddTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
