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
export class GestionColumnasService {
  message: string;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService,) {
    this.message = "";
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
  }
  public updateColumna = (id:any, nombre: any, posicion: any) => {
    const url = environment.dirBack + "updateColumna";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id, 'nombre': nombre, 'posicion': posicion }, { headers: headers });
  };
  public addColumna = (nombre: any, idTablero: any) => {
    const url = environment.dirBack + "addColumna";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'nombre': nombre, 'idTablero': idTablero }, { headers: headers });
  };
  public getColumnas = (id: any) => {
    const url = environment.dirBack + "getColumnas";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'idTablero': id }, { headers: headers });
  };

  public getColumna = (id: any) => {
    const url = environment.dirBack + "getColumna";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id }, { headers: headers });
  };

  public getColumnasfull = (id: any) => {
    const url = environment.dirBack + "getColumnasfull";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'idTablero': id }, { headers: headers });
  };

  public dropColumna = (id : any) => {
    const url = environment.dirBack + "dropColumna";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'id_Creador' : this.loginService.getUser().id,'id' : id},{ headers: headers });
  };
}
