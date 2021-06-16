import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';
import { GestionTablerosService } from '../../servicios/gestion-tableros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalColumnaComponent } from '../modal-columna/modal-columna.component';
import { ModalAddColumnaComponent } from '../modal-add-columna/modal-add-columna.component';
import { ModalAddTarjetaComponent } from '../modal-add-tarjeta/modal-add-tarjeta.component';
import { ModalInvitarTableroComponent } from '../modal-invitar-tablero/modal-invitar-tablero.component';
import { ModalTarjetaComponent } from '../modal-tarjeta/modal-tarjeta.component';
import { GestionColumnasService } from '../../servicios/gestion-columnas.service';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { textSpanIntersectsWithPosition } from 'typescript';


@Component({
  selector: 'app-tablerov2',
  templateUrl: './tablerov2.component.html',
  styleUrls: ['./tablerov2.component.scss']
})
export class Tablerov2Component implements OnInit {
  formTablero: FormGroup;
  id: any;
  submitted = false;
  tarjetastab: any;
  @Input() tablero: any = [];
  columnas: any;
  tablerov2 = [];
  @Input() contUsers:any=0;
  @Input() users:any=[];
  @Input() userid:any=null;


  constructor(private loginService: LoginService,private modal: NgbModal, private formBuilder: FormBuilder, private CompartirDatosService: CompartirDatosService, private GestionTablerosService: GestionTablerosService, private GestionColumnas: GestionColumnasService, private GestionTarjetasService: GestionTarjetasService, private router: Router) {
    this.formTablero = this.formBuilder.group({
      id: '',
      nombre: '',
    });
    this.tarjetastab = [];
    this.columnas = [];
    this.id = this.CompartirDatosService.getId();
  }

  get formulario() { return this.formTablero.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.formTablero.invalid) {
      return;
    }
      let datosTablero = this.formTablero.value;
      let id = datosTablero.id;
      let nombre = datosTablero.nombre;
      this.updateTableroNombre(id, nombre);
  }

  drop2(event: CdkDragDrop<any[]>, id: any) {
    if (event.previousContainer === event.container) {
      this.updateTarjetaPos(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateTarjetaCol(event.previousContainer.data, id, event.previousIndex, event.currentIndex);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.id = this.CompartirDatosService.getId();
    this.ngTablero();
  }

  updateTarjetaPos(data: any, pre: any, pos: any) {
    console.log(data, pre, pos);
    this.GestionTarjetasService.updateTarjetaPos(data, pre, pos).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  updateTarjetaCol(data: any, id: any, pre: any, pos: any) {
    this.GestionTarjetasService.updateTarjetaCol(data, id, pre, pos).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  updateTableroNombre(id: any, nombre: any) {
    this.GestionTablerosService.updateTableroNombre(id, nombre).subscribe(
      (response: any) => {
        console.log(response.message);
        this.id = this.CompartirDatosService.getId();
        this.ngTablero();
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getColumnas() {
    this.GestionColumnas.getColumnasfull(this.tablero.id).subscribe(
      (response: any) => {
        this.columnas = response.message.columnas;
        console.log(response.message.columnas);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  ngTablero() {
    this.GestionTablerosService.getTablero(this.id).subscribe((response: any) => {
      this.tablero = response.message.tablero;
      console.log(this.tablero);
      this.getUsersTablero(this.tablero.id);
      this.CompartirDatosService.setidTablero(this.tablero.id);
      this.getColumnas()
    },
      (error) => {
        console.log(error.message.tablero);
      }
    );
  }

  ngOnInit(): void {
    this.id = this.CompartirDatosService.getId();
    this.ngTablero();
    this.userid=this.loginService.getUser().id;
  }

  ngOnChanges(): void {
    this.id = this.CompartirDatosService.getId();
    this.ngTablero();
  }

  modalTar(id: any): void {
    this.CompartirDatosService.setidColumna(id);
    const modalRef = this.modal.open(ModalAddTarjetaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.id = this.CompartirDatosService.getId();
      this.ngTablero();
    });
  }
  modalTarjeta(id: any, colid: any): void {
    this.CompartirDatosService.setidTarjeta(id);
    this.CompartirDatosService.setidColumna(colid);
    const modalRef = this.modal.open(ModalTarjetaComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.ngTablero();
    });
  }

  modalUpdateCol(id: any) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', id);
    this.CompartirDatosService.setidColumna(id);
    const modalRef = this.modal.open(ModalColumnaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.ngTablero();
    });
    this.ngTablero();
  }

  modalCol(): void {
    const modalRef = this.modal.open(ModalAddColumnaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.ngTablero();
    });
  }

  eliminar(id: any) {
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar el tablero de la base de datos? Se perderan todos los datos.';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.GestionTablerosService.dropTablero(id).subscribe(
        (response: any) => {
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = ' Eliminado correctamente';
          modalRef.componentInstance.exito = true;
          this.router.navigate(['/tableros']);
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar el tablero';
          modalRef.componentInstance.exito = false;
        }
      );
    });
  }


  modalInvitarTablero(): void {
    const modalRef = this.modal.open(ModalInvitarTableroComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.id = this.CompartirDatosService.getId();
      this.ngTablero();
    });
  }

  getUsersTablero(id: any) {
    this.GestionTablerosService.getUsersTablero(id).subscribe(
      (response: any) => {
        this.users=response.message.users;
        console.log(response.message);
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al obtener usuarios';
        modalRef.componentInstance.exito = false;
      }
    );
  }
}