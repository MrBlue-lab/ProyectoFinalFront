import { Component, OnInit } from '@angular/core';
import { GestionTarjetasService } from '../../servicios/gestion-tarjetas.service';
import { CompartirDatosService } from '../../servicios/compartir-datos.service';
import { ModalTarjetaComponent } from '../modal-tarjeta/modal-tarjeta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];


  monthSelect: any[]=[];
  dateSelect: any;
  dateValue: any;
  dateToday:any='';
  tarjetas:any[]=[];
  tarjetasDay:any=[];
  actualMonth:any=0;
  selectedMonth:any=0;


  constructor(private modal: NgbModal,private GestionTarjetasService: GestionTarjetasService,private CompartirDatosService: CompartirDatosService,) {
    var now = new Date();
    this.dateToday=now.getDate();
  }
  hayVecDate() {
    console.log(this.tarjetasDay.length);
    return this.tarjetasDay.length>0;              
  }
  hayVec() {
    console.log(this.tarjetas.length);
    return this.tarjetas.length > 0;              
  }
  ngOnInit(): void {
    this.getTarjeta();
    var now = new Date();
    this.dateToday=now.getDate();
    this.getDaysFromDate(now.getMonth()+1, now.getFullYear());
    this.actualMonth=now.getMonth()+1;
    console.log('---------------------------',this.actualMonth);
  }
  increaseMonth(){
    var now = new Date();
    this.getDaysFromDate(now.getMonth()+1, now.getFullYear())
  }
  decreaseMonth(){
    var now = new Date();
    this.getDaysFromDate(now.getMonth()-1, now.getFullYear())
  }
  setCurrentMonth(){
    var now = new Date();
    this.getDaysFromDate(now.getMonth()+1, now.getFullYear())
  }


  getTarjeta() {
    this.GestionTarjetasService.getTarjetasDate().subscribe(
      (response: any) => {
        console.log(response.message.tarjetas);
        this.tarjetas = response.message.tarjetas;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  getTarjetaDay(date:any) {
    console.log('fecha',date);
    this.GestionTarjetasService.getTarjetaDate(date).subscribe(
      (response: any) => {
        console.log(response.message);
        this.tarjetasDay = response.message.tarjetas;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }


  getDaysFromDate(month:any, year:any) {
    this.selectedMonth=month;
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag:any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day:any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse);
    this.getTarjetaDay(parse);
    console.log(parse); 
    this.dateValue = objectDate;
  }



  modalTarjeta(id: any): void {
    this.CompartirDatosService.setidTarjeta(id);
    const modalRef = this.modal.open(ModalTarjetaComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Ha ocurrido un error';
    modalRef.componentInstance.exito = false;
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.getTarjeta();
    });
  }
}