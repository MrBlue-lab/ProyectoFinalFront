import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class GestionTarjetasService {
  message: string;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService,) {
    this.message = "";
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
  }

  public getTarjetaDate = (date:any) => {
    const url = environment.dirBack + "getTarjetaDate";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id' : this.loginService.getUser().id,'date':date},{ headers: headers });
  };
  public getTarjetasDate = () => {
    const url = environment.dirBack + "getTarjetasDate";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id' : this.loginService.getUser().id},{ headers: headers });
  };
  public getTarjeta = (id: any) => {
    const url = environment.dirBack + "getTarjeta";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'idTarjeta': id }, { headers: headers });
  };
  public dropTarjeta = (id: any) => {
    const url = environment.dirBack + "dropTarjeta";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id }, { headers: headers });
  };

  public getTarjetas = (id: any) => {
    const url = environment.dirBack + "getTarjetas";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'idColumna': id }, { headers: headers });
  };

  public updateTarjeta = (id: any, nombre: any, posicion: any, descripcion: any, boolFechafin: any, datefin: any, timefin: any, boolFechaini: any, dateinit: any, timeinit: any, not_fecha_inicio: any, not_fecha_fin: any, check_fin: any) => {
    console.log('not_fecha_fin', not_fecha_fin, 'not_fecha_inicio', not_fecha_inicio);
    const url = environment.dirBack + "updateTarjeta";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id, 'nombre': nombre, 'posicion': posicion, 'descripcion': descripcion, 'boolFechafin': boolFechafin, 'datefin': datefin, 'timefin': timefin, 'boolFechaini': boolFechaini, 'dateinit': dateinit, 'timeinit': timeinit, 'not_fecha_inicio': not_fecha_inicio, 'not_fecha_fin': not_fecha_fin, 'check_fin': check_fin }, { headers: headers });
  };
  public setTarjetaList = (nombre: any, descripcion: any) => {
    const url = environment.dirBack + "setTarjeta";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'nombre': nombre, 'descripcion': descripcion }, { headers: headers });
  };

  public setTarjeta = (nombre: any, descripcion: any, columna: any) => {
    const url = environment.dirBack + "setTarjeta";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'nombre': nombre, 'descripcion': descripcion, 'columna': columna }, { headers: headers });
  };
  public setTarjetas = (datos: any, id_destino: any) => {
    const url = environment.dirBack + "setTarjetas";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos, 'id_destino': id_destino }, { headers: headers });
  };

  public updateTarjetaCol = (datos: any, id_destino: any, id_pre: any, id_pos: any) => {
    const url = environment.dirBack + "updateTarjetaCol";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos, 'id_destino': id_destino, 'id_pre': id_pre, 'id_pos': id_pos }, { headers: headers });
  };
  public updateTarjetaPos = (datos: any, id_pre: any, id_pos: any) => {
    const url = environment.dirBack + "updateTarjetaPos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos, 'id_pre': id_pre, 'id_pos': id_pos }, { headers: headers });
  };

}
