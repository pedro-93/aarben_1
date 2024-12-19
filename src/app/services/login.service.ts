import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async login(credenciales: { rut: string; password: string }): Promise<string> {
    try {
      console.log(credenciales.rut)
      const usuariosCollection = collection(this.firestore, 'TRABAJADORES');
      const q = query(usuariosCollection, where('rut', '==', credenciales.rut));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)

      if (!querySnapshot.empty) {
        const usuario = querySnapshot.docs[0].data() as { rut: string };
        if (usuario.rut === credenciales.rut) {
          return 'Inicio de sesión exitoso';
        } else {
          throw new Error('Credenciales incorrectas');
        }
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error en el inicio de sesión');
    }
  }
}
