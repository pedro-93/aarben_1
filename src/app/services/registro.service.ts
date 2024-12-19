import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private trabajadoresCollection: any;

  constructor(private firestore: Firestore) {
    // Cambia 'TRABAJADORES' por 'ADMIN/TRABAJADORES' si corresponde
    this.trabajadoresCollection = collection(firestore, 'TRABAJADORES'); // Asegúrate de que esto sea correcto según tu estructura
  }

  async registrarTrabajador(data: { nombre: string; rut: string; entrada: any; salida: any }) {
    try {
      await addDoc(this.trabajadoresCollection, data);
      console.log('Trabajador registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar el trabajador: ', error);
    }
  }
}
