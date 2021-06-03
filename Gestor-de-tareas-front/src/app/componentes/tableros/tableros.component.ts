import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalAlertaComponent} from '../modal-alerta/modal-alerta.component';
import { Router } from '@angular/router';
import { ModalCrearTableroComponent} from '../modal-crear-tablero/modal-crear-tablero.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionTablerosService } from '../../servicios/gestion-tableros.service';
import { LoginService } from '../../servicios/login.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';

@Component({
  selector: 'app-tableros',
  templateUrl: './tableros.component.html',
  styleUrls: ['./tableros.component.scss']
})
export class TablerosComponent implements OnInit {
  Tableros: any;
  constructor(private modal: NgbModal , private GestionTablerosService: GestionTablerosService, private loginService: LoginService, private CompartirDatosService:CompartirDatosService,private router: Router) { 
    
  }

  getTableros() {
    this.GestionTablerosService.getTableros().subscribe(
      (response: any) => {
        this.Tableros = response.message;
        console.log(response.message);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  ngOnInit(): void {
    this.getTableros();
  }
  ngOnchange(){
    this.getTableros();
  }
  activar(): void {
    const modalRef = this.modal.open(ModalCrearTableroComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.GestionTablerosService.getTableros().subscribe(
      (response: any) => {
        this.Tableros = response.message;
        console.log(response.message);
      },
      (error) => {
        console.log(error.message);
      }
      );
    });

  }
  tablero(id:any,tipo:any) {
    if(tipo == 1){
      this.CompartirDatosService.setId(id);
      this.router.navigate(['/tablero']);
    }else if(tipo == 2){
      this.CompartirDatosService.setId(id);
      this.router.navigate(['/lista']);
    }
  }
}
