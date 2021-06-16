import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAmigosComponent } from './modal-amigos.component';
import { FiltroPipe } from '../../pipes/filtro.pipe';

describe('ModalAmigosComponent', () => {
  let component: ModalAmigosComponent;
  let fixture: ComponentFixture<ModalAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAmigosComponent,FiltroPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
