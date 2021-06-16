import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  id: any;
  idTarjeta: any;
  idColumna: any;
  idTablero: any;
  Columnas: any;
  public static readonly SESSION_STORAGE_KEY_AL: string = "idAlmacenada";
  public static readonly SESSION_STORAGE_KEY_TAR: string = "idTarjeta";
  public static readonly SESSION_STORAGE_KEY_TAB: string = "idTablero";
  public static readonly SESSION_STORAGE_KEY_COL: string = "idColumna";
  public static readonly SESSION_STORAGE_KEY_COLUMNAS: string = "Columnas";
  
  constructor() { }

  setColumnas(Columnas: any) {
    this.Columnas = Columnas;
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_COL, JSON.stringify(Columnas));
  }

  getColumnas() {
    let Columnas:any;
    Columnas = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_COL);
    var sal= JSON.parse(Columnas);
    return sal;
  }

  setidColumna(idColumna: any) {
    this.idColumna = idColumna;
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_COL, JSON.stringify(idColumna));
  }
  
  getidTablero() {
    let idTablero:any;
    idTablero = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_TAB);
    var sal= JSON.parse(idTablero);
    return sal;
  }

  setidTablero(idTablero: any) {
    this.idTablero = idTablero;
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_TAB, JSON.stringify(idTablero));
  }
  getidColumna() {
    let idColumna:any;
    idColumna = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_COL);
    var sal= JSON.parse(idColumna);
    console.log(sal);
    return sal;
  }
  
  setidTarjeta(idTarjeta: any) {
    this.idTarjeta = idTarjeta;
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_TAR, JSON.stringify(idTarjeta));
  }

  getidTarjeta() {
    let idTarjeta:any;
    idTarjeta = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_TAR);
    var sal= JSON.parse(idTarjeta);
    return sal;
  }

  setId(id: any) {
    this.id = id;
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_AL, JSON.stringify(id));
  }
  getId() {
    let id:any;
    id = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_AL);
    var sal= JSON.parse(id);
    return sal;
  }
}
