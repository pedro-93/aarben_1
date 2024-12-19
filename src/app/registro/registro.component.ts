import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { FormsModule } from '@angular/forms'; // Asegúrate de importarlo

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nombre: string = '';
  rut: string = '';
  entrada: any = null;
  salida: any = null;

  constructor(private registroService: RegistroService) {}

  registrar() {
    const data = {
      nombre: this.nombre,
      rut: this.rut,
      entrada: this.entrada,
      salida: this.salida,
    };

    this.registroService.registrarTrabajador(data)
      .then(() => {
        console.log('Registro exitoso');
      })
      .catch((error) => console.error('Error al registrar el trabajador: ', error));
  }
}
