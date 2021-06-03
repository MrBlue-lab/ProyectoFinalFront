import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';

@Component({
  selector: 'app-modal-add-tarjeta',
  templateUrl: './modal-add-tarjeta.component.html',
  styleUrls: ['./modal-add-tarjeta.component.scss']
})
export class ModalAddTarjetaComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  newTarjeta: FormGroup;
  submittedFoto = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal, private GestionTableros: GestionTarjetasService,private CompartirDatosService:CompartirDatosService) {
    this.newTarjeta = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      dateinit: ['', [Validators.required]],
      datefin: ['', [Validators.required]],
      timeinit: ['', [Validators.required]],
      timefin: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() { return this.newTarjeta.controls; }

  onSubminTablero(){
    let tablero=this.newTarjeta.value;
    console.log(tablero);
    this.GestionTableros.setTarjeta(tablero.nombre,tablero.descripcion,this.CompartirDatosService.getidColumna()).subscribe(
      (response: any) => {
        this.activeModal.close();
        this.storeOk.emit(true);
        console.log(response.message);
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
