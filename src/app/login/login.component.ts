import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rut: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  iniciarSesion() {
    const credenciales = { rut: this.rut, password: this.password };
  
    this.loginService.login(credenciales)
      .then((mensaje) => {
        console.log(mensaje);
        this.errorMessage = '';
        this.router.navigate(['/home']); // Redirige a la vista de home
      })
      .catch((error) => {
        console.error('Error en inicio de sesión:', error);
        this.errorMessage = 'Credenciales incorrectas';
      });
  }
}
