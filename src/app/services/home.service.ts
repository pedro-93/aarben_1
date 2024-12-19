import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl: string = 'http://localhost:3000/api'; // URL del microservicio

  constructor(private http: HttpClient) {}

  /**
   * Registra la entrada de un trabajador en el microservicio.
   * @param payload - Objeto que contiene trabajador, foto, geolocalización y hora de entrada.
   * @returns Observable para manejar la respuesta del microservicio.
   */
  registrarEntradaMicroservicio(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/entradas`, payload);
  }

  /**
   * Registra la salida de un trabajador en el microservicio.
   * @param payload - Objeto que contiene trabajador y hora de salida.
   * @returns Observable para manejar la respuesta del microservicio.
   */
  registrarSalidaMicroservicio(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/salidas`, payload);
  }

  /**
   * Obtiene los registros (entradas y salidas) de un trabajador desde el microservicio.
   * @param trabajador - El **nombre del trabajador** para filtrar los registros.
   * @returns Observable con la lista de registros del trabajador.
   */
  obtenerRegistrosMicroservicio(trabajador: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/trabajadores?trabajador=${trabajador}`); // Filtra por nombre
  }
}
