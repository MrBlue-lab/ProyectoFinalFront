import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionColumnasService } from '../../servicios/gestion-columnas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';

@Component({
  selector: 'app-modal-columna',
  templateUrl: './modal-columna.component.html',
  styleUrls: ['./modal-columna.component.scss']
})
export class ModalColumnaComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  formTarjeta: FormGroup;
  message: any;
  submitted = false;
  columna: any;
  tar: any;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal, private GestionColumnas: GestionColumnasService, private CompartirDatosService: CompartirDatosService) {
    this.message = '';
    this.columna = '';

    this.formTarjeta = this.formBuilder.group({
      id: '',
      nombre: '',
      posicion: '',
    });
  }

  ngOnInit(): void {
    this.getColumna(this.CompartirDatosService.getidColumna());
  }

  get formulario() { return this.formTarjeta.controls; }
  
  onSubmit() {
    this.getColumna(this.CompartirDatosService.getidColumna());
    this.submitted = true;
    if (this.formTarjeta.invalid) {
      return;
    }
    const id = this.columna.id;
    let datosTarjeta = this.formTarjeta.value;
    let nombre = datosTarjeta.nombre;
    let posicion = datosTarjeta.posicion;
    if (nombre == "") {
      nombre = this.columna.nombre;
    }
    if (posicion === "") {
      posicion = this.columna.posicion;
    }
    this.updateColumna(id, nombre, posicion);
    this.onReset();
    this.cancelar();
  }

  updateColumna(id: any, nombre: any, posicion: any) {
    this.GestionColumnas.updateColumna(id, nombre, posicion).subscribe(
      (response: any) => {
        console.log(response.message);
        this.storeOk.emit(true);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  getColumna(id: any) {
    this.GestionColumnas.getColumna(id).subscribe(
      (response: any) => {
        this.columna = response.message.columna;
        console.log(this.columna);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }


  onReset() {
    this.submitted = false;
    this.formTarjeta.reset();
  }

  cancelar() {
    this.activeModal.close();
  }

  eliminar(id: any) {
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar la columna de la base de datos? \r\n\r\n *Se eliminaran todas las tarjetas de la columna*';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      
      this.GestionColumnas.dropColumna(id).subscribe(
        (response: any) => {
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = ' Eliminado correctamente';
          modalRef.componentInstance.exito = true;
          this.storeOk.emit(true);
          this.onReset();
          this.cancelar();
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar la columna '+ error.message;
          modalRef.componentInstance.exito = false;
          this.activeModal.close();
        }
      );
    });
  }
}
