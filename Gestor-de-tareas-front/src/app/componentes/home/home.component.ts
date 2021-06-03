import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent} from '../banner/banner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    const modalRef = this.modal.open(BannerComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exito = false;
  }

}
