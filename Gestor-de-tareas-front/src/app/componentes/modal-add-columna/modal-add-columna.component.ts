import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionColumnasService } from '../../servicios/gestion-columnas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';

@Component({
  selector: 'app-modal-add-columna',
  templateUrl: './modal-add-columna.component.html',
  styleUrls: ['./modal-add-columna.component.scss']
})
export class ModalAddColumnaComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  newColumna: FormGroup;
  submittedFoto = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal, private GestionColumnas: GestionColumnasService,private CompartirDatosService:CompartirDatosService) {
    this.newColumna = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() { return this.newColumna.controls; }

  onSubminTablero(){
    let tablero=this.newColumna.value;
    this.GestionColumnas.addColumna(tablero.nombre, this.CompartirDatosService.getId()).subscribe(
      (response: any) => {
        this.activeModal.close();
        this.storeOk.emit(true);
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al registrar la tarjeta';
        modalRef.componentInstance.exito = false;
      }
    );
  }
  cancelar() {
    this.activeModal.close();
  }
}
