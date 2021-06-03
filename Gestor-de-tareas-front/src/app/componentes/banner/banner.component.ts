import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  @Input() public mensaje: any;
  @Input() public exito: any;
  showBanner = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.showBanner = true;
  }
  //Cancelar
  cancelar() {
    this.activeModal.close();
  }

}
