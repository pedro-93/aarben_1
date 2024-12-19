import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  rutTrabajador: string = ''; // RUT del trabajador
  entrada: boolean = false;
  tiempoTrabajado: number = 0;
  timer: any;

  constructor(private homeService: HomeService) {}

  iniciarCronometro() {
    this.tiempoTrabajado = 0;
    this.timer = setInterval(() => {
      this.tiempoTrabajado++;
      console.log('Tiempo trabajado en segundos: ', this.tiempoTrabajado);
    }, 1000);
  }

  async tomarFoto() {
    try {
      const video = document.createElement('video');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();

      await new Promise((resolve) => setTimeout(resolve, 3000)); // Espera 3 segundos para capturar la foto

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const foto = canvas.toDataURL('image/png');
      console.log('Foto capturada:', foto);

      // Detener la cámara
      stream.getTracks().forEach((track) => track.stop());

      return foto;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
      throw error;
    }
  }

  async obtenerGeolocalizacion() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => {
            console.error('Error al obtener la ubicación:', error);
            reject('No se pudo obtener la ubicación.');
          }
        );
      } else {
        reject('La geolocalización no está soportada en este navegador.');
      }
    });
  }

  async marcarEntrada() {
    if (!this.rutTrabajador) {
      alert('Por favor, ingrese su RUT antes de marcar entrada.');
      return;
    }

    try {
      const foto = await this.tomarFoto();
      const posicion = await this.obtenerGeolocalizacion();

      const payload = {
        trabajador: this.rutTrabajador,
        horaEntrada: new Date().toISOString(),
        foto: foto,
        ubicacion: {
          latitud: posicion.coords.latitude,
          longitud: posicion.coords.longitude,
        },
      };

      console.log('Payload enviado:', payload);

      const response = await this.homeService.registrarEntradaMicroservicio(payload).toPromise();
      console.log('Respuesta del microservicio:', response);
      alert('Entrada registrada correctamente.');
      this.entrada = true;
      this.iniciarCronometro();
    } catch (error) {
      console.error('Error al marcar la entrada:', error);
      alert('Ocurrió un error al marcar la entrada.');
    }
  }

  async marcarSalida() {
    if (!this.rutTrabajador) {
      alert('Por favor, ingrese su RUT antes de marcar salida.');
      return;
    }

    const payload = {
      trabajador: this.rutTrabajador,
      horaSalida: new Date().toISOString(),
    };

    try {
      await this.homeService.registrarSalidaMicroservicio(payload).toPromise();
      console.log('Salida marcada correctamente.');
      clearInterval(this.timer);
      this.entrada = false;
    } catch (error) {
      console.error('Error al marcar la salida:', error);
      alert('Ocurrió un error al marcar la salida.');
    }
  }

  async consultarRegistro() {
    if (!this.rutTrabajador) {
      alert('Por favor, ingrese su RUT antes de consultar el registro.');
      return;
    }

    try {
      const response = await this.homeService
        .obtenerRegistrosMicroservicio(this.rutTrabajador)
        .toPromise();
      console.log('Registro del trabajador:', response);
      alert('Consulta realizada correctamente. Revisa los detalles en la consola.');
    } catch (error) {
      console.error('Error al consultar el registro:', error);
      alert('Ocurrió un error al consultar el registro.');
    }
  }
}
