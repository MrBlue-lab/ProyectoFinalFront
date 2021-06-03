import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { GestionTablerosService } from '../../servicios/gestion-tableros.service';

@Component({
  selector: 'app-modal-crear-tablero',
  templateUrl: './modal-crear-tablero.component.html',
  styleUrls: ['./modal-crear-tablero.component.scss']
})
export class ModalCrearTableroComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  @Input() public alumno: any;
  newTablero: FormGroup;
  submittedFoto = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal, private GestionTableros: GestionTablerosService) {
    this.newTablero = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() { return this.newTablero.controls; }

  onSubminTablero(){
    let tablero=this.newTablero.value;
    console.log(tablero);
    this.GestionTableros.setTableros(tablero.nombre,tablero.tipo,tablero.descripcion).subscribe(
      (response: any) => {
        this.activeModal.close();
        this.storeOk.emit(true);
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al registrar el tablero';
        modalRef.componentInstance.exito = false;
      }
    );
  }
  cancelar() {
    this.activeModal.close();
  }
}
