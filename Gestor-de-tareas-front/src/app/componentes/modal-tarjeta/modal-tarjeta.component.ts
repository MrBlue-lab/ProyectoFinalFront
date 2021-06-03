import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionColumnasService } from '../../servicios/gestion-columnas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';


@Component({
  selector: 'app-modal-tarjeta',
  templateUrl: './modal-tarjeta.component.html',
  styleUrls: ['./modal-tarjeta.component.scss']
})
export class ModalTarjetaComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  formTarjeta: FormGroup;
  message: any;
  submitted = false;
  tarjeta: any;
  tar: any;
  static fechaAlIni: any;
  static fechaAlFin: any;
  static timeAlIni: any;
  static timeAlFin: any;
  boolFechafin: boolean;
  boolFechaini: boolean;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal, private GestionColumnas: GestionColumnasService, private CompartirDatosService: CompartirDatosService,
    private GestionTarjetasService: GestionTarjetasService) {
    this.message = '';
    this.tarjeta = '';
    this.getTarjeta(this.CompartirDatosService.getidTarjeta());
    this.boolFechaini = true;
    this.boolFechafin = true;

    this.formTarjeta = this.formBuilder.group({
      id: '',
      nombre: '',
      columna: '',
      posicion: '',
      descripcion: '',
      dateinit: '',
      datefin: '',
      timeinit: '',
      timefin: '',
      not_fecha_inicio: '',
      not_fecha_fin: '',
      check_fin: ''
    });
  }

  ngOnInit(): void {
    this.getTarjeta(this.CompartirDatosService.getidTarjeta());
  }
  disabledIni() {
    if (this.boolFechaini) {
      this.boolFechaini = false;
    } else {
      this.boolFechaini = true;
      this.tarjeta.dateinit = null;
      this.tarjeta.timeinit = null;
      this.disabledChange(this.tarjeta.not_fecha_fin, this.tarjeta.not_fecha_inicio);
    }
  }

  disabledFin() {
    if (this.boolFechafin) {
      this.boolFechafin = false;
    } else {
      this.boolFechafin = true;
      this.tarjeta.datefin = null;
      this.tarjeta.timefin = null;
      this.disabledChange(this.tarjeta.not_fecha_fin, this.tarjeta.not_fecha_inicio);
    }
  }

  disabledChange(fecha: any, fecha2: any) {
    if (fecha === false && fecha2 === false) {
      this.tarjeta.check_fin = null;
    } else {
      if (this.tarjeta.check_fin == null || this.tarjeta.check_fin == null) {
        this.tarjeta.check_fin = false;
      } else {
        this.tarjeta.check_fin = this.tarjeta.check_fin;
      }
    }
  }

  get formulario() { return this.formTarjeta.controls;}

  onSubmit() {
    this.getTarjeta(this.CompartirDatosService.getidTarjeta());
    this.submitted = true;
    if (this.formTarjeta.invalid) {
      return;
    }
    let datosTarjeta = this.formTarjeta.value;
    let check_fin = datosTarjeta.check_fin;
    let not_fecha_fin = datosTarjeta.not_fecha_fin;
    let not_fecha_inicio = datosTarjeta.not_fecha_inicio;
    let dateinit = datosTarjeta.dateinit;
    let datefin = datosTarjeta.datefin;
    let timeinit = datosTarjeta.timeinit;
    let timefin = datosTarjeta.timefin;
    let id = this.tarjeta.id;
    let nombre = datosTarjeta.nombre;
    let posicion = datosTarjeta.posicion;
    let descripcion = datosTarjeta.descripcion;
    if (not_fecha_inicio === 1 || not_fecha_inicio === true) {
      not_fecha_inicio = false;
      dateinit = null;
      timeinit = null;
    } else if (not_fecha_inicio === false) {
      not_fecha_inicio = true;
      if (dateinit == "") {
        if (this.tarjeta.Fecha_inicio == "" || this.tarjeta.Fecha_inicio == null) {
          var now = new Date();
          let mes = '';
          if ((now.getMonth()+1) < 10) {
            mes = '0' + (now.getMonth()+1);
          } else {
            mes = '' + (now.getMonth()+1);
          }
          dateinit = now.getFullYear() + "-" + mes + "-" + now.getDate();
        } else {
          dateinit = this.tarjeta.Fecha_inicio;
        }
      }
      if (timeinit == "") {
        timeinit = this.tarjeta.Time_inicio;
      }
    }
    if (not_fecha_fin == 1 || not_fecha_fin == true) {
      not_fecha_fin = false;
      datefin = null;
      timefin = null;
    } else if (not_fecha_fin === false) {
      not_fecha_fin = true;
      if (datefin == "") {
        console.log('paso 1');
        if (this.tarjeta.Fecha_fin == "" || this.tarjeta.Fecha_fin == null) {
          var now = new Date();
          let mes = '';
          if ((now.getMonth()+1) < 10) {
            mes = '0' + (now.getMonth()+1);
          } else {
            mes = '' + (now.getMonth()+1);
          }
          datefin = now.getFullYear() + "-" + mes + "-" + now.getDate();
        } else {
          datefin = this.tarjeta.Fecha_fin;
        }
      }
      if (timeinit == "") {
        timefin = this.tarjeta.Time_fin;
      }
    }
    if (not_fecha_fin === false && not_fecha_inicio === false) {
      check_fin = null;
    } else {
      if (check_fin == null || this.tarjeta.check_fin == null) {
        check_fin = false;
      } else {
        check_fin = this.tarjeta.check_fin;
      }
    }
    console.log(check_fin);
    if (nombre == "") {
      nombre = this.tarjeta.nombre;
    }
    if (descripcion == "") {
      descripcion = this.tarjeta.descripcion;
    }
    this.upTarjeta(id, nombre, posicion, descripcion, this.boolFechafin, datefin, timefin, this.boolFechaini, dateinit, timeinit, not_fecha_inicio, not_fecha_fin, check_fin);
    this.onReset();
    this.cancelar();
  }
  upTarjeta(id: any, nombre: any, posicion: any, descripcion: any, boolFechafin: any, datefin: any, timefin: any, boolFechaini: any, dateinit: any, timeinit: any, not_fecha_inicio: any, not_fecha_fin: any, check_fin: any) {
    this.GestionTarjetasService.updateTarjeta(id, nombre, posicion, descripcion, boolFechafin, datefin, timefin, boolFechaini, dateinit, timeinit, not_fecha_inicio, not_fecha_fin, check_fin).subscribe(
      (response: any) => {
        console.log(response.message);
        this.storeOk.emit(true);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  getTarjeta(id: any) {
    this.GestionTarjetasService.getTarjeta(id).subscribe(
      (response: any) => {
        this.tarjeta = response.message.tarjeta[0];
        console.log(this.tarjeta, 'linea 120');
        console.log(this.tarjeta.Fecha_fin, this.tarjeta.Fecha_inicio);
        ModalTarjetaComponent.fechaAlFin = this.tarjeta.Fecha_fin;
        ModalTarjetaComponent.fechaAlIni = this.tarjeta.Fecha_inicio;
        ModalTarjetaComponent.timeAlFin = this.tarjeta.Time_fin;
        ModalTarjetaComponent.timeAlIni = this.tarjeta.Time_inicio;
        if (this.tarjeta.not_fecha_inicio == 1) {
          this.boolFechaini = false;
        } else {
          this.boolFechaini = true;
        }
        if (this.tarjeta.not_fecha_fin == 1) {
          this.boolFechafin = false;
        } else {
          this.boolFechafin = true;
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  borrarTarjeta(id:any) {
    this.GestionTarjetasService.getTarjeta(id).subscribe(
      (response: any) => {
        this.message = response.message;
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
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar la tarjeta de la base de datos?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.GestionTarjetasService.dropTarjeta(id).subscribe(
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
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar el alumno';
          modalRef.componentInstance.exito = false;
          this.activeModal.close();
        }
      );
    });
  }
}
