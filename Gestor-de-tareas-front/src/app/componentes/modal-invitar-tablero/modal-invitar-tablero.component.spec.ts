import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInvitarTableroComponent } from './modal-invitar-tablero.component';
import { FiltroPipe } from '../../pipes/filtro.pipe';

describe('ModalInvitarTableroComponent', () => {
  let component: ModalInvitarTableroComponent;
  let fixture: ComponentFixture<ModalInvitarTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInvitarTableroComponent ,FiltroPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInvitarTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
