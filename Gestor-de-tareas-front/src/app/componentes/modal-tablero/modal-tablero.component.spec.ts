import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTableroComponent } from './modal-tablero.component';

describe('ModalTableroComponent', () => {
  let component: ModalTableroComponent;
  let fixture: ComponentFixture<ModalTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTableroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
