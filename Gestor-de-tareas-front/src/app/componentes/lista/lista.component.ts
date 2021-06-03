import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';
import { GestionTablerosService } from '../../servicios/gestion-tableros.service';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddColumnaComponent } from '../modal-add-columna/modal-add-columna.component';
import { ModalAddTarjetaComponent } from '../modal-add-tarjeta/modal-add-tarjeta.component';
import { ModalTarjetaComponent } from '../modal-tarjeta/modal-tarjeta.component';
import { GestionColumnasService } from '../../servicios/gestion-columnas.service';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';
import { textSpanIntersectsWithPosition } from 'typescript';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  id: any;
  tarjetas= [{ 'valor':'hola'},{'id_Columna':'0' }];
  tarjetastab: any;
  tablero: any;
  columnas: any;
  tablerov2 = [];

  constructor(private modal: NgbModal, private CompartirDatosService: CompartirDatosService, private GestionTablerosService: GestionTablerosService, private GestionColumnas: GestionColumnasService,private GestionTarjetasService: GestionTarjetasService) {
    //this.tarjetas = [];
    this.tarjetastab = [];
    this.columnas = [];
    this.tablero = [];
    this.id = this.CompartirDatosService.getId();
  }

  drop2(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      console.log('aquiiiii ', event.container);
      console.log(event.container.data, ' event.previousIndex ' + event.previousIndex, ' event.currentIndex ' + event.currentIndex);
      var o = event.container.data[event.previousIndex];
      event.container.data[event.previousIndex] = event.container.data[event.currentIndex];
      event.container.data[event.currentIndex] = o;
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data, event.container.data,
        ' event.previousIndex ' + event.previousIndex,
        ' event.currentIndex ' + event.currentIndex);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getTarjetas(col:any) {
    let id=col.id;
    this.GestionTarjetasService.getTarjetas(id).subscribe(
      (response: any) => {
        this.tarjetastab= response.message.tarjetas;
        console.log(this.tarjetas);
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
        console.log('aquiiiiiiiiiiiiiiii');
        console.log(response.message.columnas);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  ngTablero() {
    this.GestionTablerosService.getTablero(this.id).subscribe((response: any) => {
      this.tablero = response.message.tablero[0];
      this.tablero.id = response.message.tablero[0].id;
      this.tablero.nombre = response.message.tablero[0].nombre;
      this.tablero.descripcion = response.message.tablero[0].descripcion;
      this.tablero.id_Creador = response.message.tablero[0].id_Creador;
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
  }

  ngChange(): void {
  }

  modalTar(id:any): void {
    const modalRef = this.modal.open(ModalAddTarjetaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.ngTablero();
    });
  }
  modalTarjeta(id:any): void {
    this.CompartirDatosService.setidTarjeta(id);
    const modalRef = this.modal.open(ModalTarjetaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.ngTablero();
    });
  }

  modalCol(): void {
    const modalRef = this.modal.open(ModalAddColumnaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.ngTablero();
    });
  }

}