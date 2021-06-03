import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';
import { GestionTablerosService } from '../../servicios/gestion-tableros.service';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddColumnaComponent } from '../modal-add-columna/modal-add-columna.component';
import { ModalAddTarjetaComponent } from '../modal-add-tarjeta/modal-add-tarjeta.component';
import { GestionColumnasService } from '../../servicios/gestion-columnas.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {
  id: any;
  tableros = [
    {
      'id': '01',
      'nombre': 'todo',
      'posicion': '0',
      'tarjetas': [
        { 'valor': 'A1' }
      ]
    }, {
      'id': '02',
      'nombre': 'done',
      'posicion': '1',
      'tarjetas': [
        { 'valor': 'B1' }
      ]
    }, {
      'id': '03',
      'nombre': 'casi',
      'posicion': '2',
      'tarjetas': [
        { 'valor': 'C1' }
      ]
    }
  ]

  @Input() public tablero: any;
  @Input() public columnas: any;

  constructor(private modal: NgbModal, private CompartirDatosService: CompartirDatosService, private GestionTablerosService: GestionTablerosService, private GestionColumnas: GestionColumnasService) {
    this.columnas = {
      'id': "",
      'nombre': "",
      'posicion': "",
    }
    this.tablero = {
      'id': "",
      'nombre': "",
      'descripcion': "",
      'id_Creador': "",
    }
    this.id = this.CompartirDatosService.getId();
    console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(this.id);
    console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(this.tablero);
  }
  
  drop(event: CdkDragDrop<Object[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('event previus ' + event.previousContainer.data,
        ' event.container.data ' + event.container.data,
        ' event.previousIndex ' + event.previousIndex,
        ' event.currentIndex ' + event.currentIndex);

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  drop2(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
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

  getTableros() {
    this.GestionTablerosService.getTableros().subscribe(
      (response: any) => {
        this.tableros = response.message;
        console.log(response.message);
      },
      (error) => {
        console.log(error.message);
      }
    );

  }
  getColumnas() {
    console.log(this.tablero.id);
    this.GestionColumnas.getColumnas(this.tablero.id).subscribe(
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
    this.GestionTablerosService.getTablero(this.id).subscribe(
      (response: any) => {
        this.tablero = response.message.tablero[0];
        this.tablero.id = response.message.tablero[0].id;
        this.tablero.nombre = response.message.tablero[0].nombre;
        this.tablero.descripcion = response.message.tablero[0].descripcion;
        this.tablero.id_Creador = response.message.tablero[0].id_Creador;
        console.log('aqui');
        console.log(this.tablero);
        this.getColumnas();
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
    this.id = this.CompartirDatosService.getId();
    this.ngTablero();
  }

  modalTar(): void {
    const modalRef = this.modal.open(ModalAddTarjetaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.GestionTablerosService.getTableros().subscribe(
        (response: any) => {
          this.tablero = response.message;
        },
        (error) => {
          console.log(error.message);
        }
      );
    });
  }

  modalCol(): void {
    const modalRef = this.modal.open(ModalAddColumnaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.GestionColumnas.getColumnas(this.tablero.id).subscribe(
        (response: any) => {
          this.tablero = response.message;
          console.log(response.message);
        },
        (error) => {
          console.log(error.message);
        }
      );
    });

  }

}
