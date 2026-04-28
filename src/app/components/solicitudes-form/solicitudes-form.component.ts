import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudesService } from '../../solicitudes.service';

@Component({
  selector: 'app-solicitudes-form',
  templateUrl: './solicitudes-form.component.html',
  styleUrls: ['./solicitudes-form.component.scss']
})
export class SolicitudesFormComponent {
  miFormulario!: FormGroup;
  enviando: boolean = false;
  mensajeError = false;
  exito: boolean = false;

  constructor(
    private fb: FormBuilder,
    private solicitudesService: SolicitudesService,
    private router: Router
  ) {
    // Validaciones estrictas según los requisitos
    this.miFormulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
      categoria: ['', Validators.required],
      prioridad: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  // Le ponemos 'async' delante porque ahora esperamos a internet
  async onSubmit() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.mensajeError = false;

    try {
      // Intentamos guardar en la base de datos
      await this.solicitudesService.insertarSolicitud(this.miFormulario.value);
     
      // Si llega aquí, es que ha ido bien
      this.exito = true;
      this.miFormulario.reset({ categoria: 'Soporte Técnico', prioridad: 2 });
     
      setTimeout(() => {
        this.router.navigate(['/mis-solicitudes']);
      }, 2000);

    } catch (error) {
      // Si falla, entra por aquí
      console.error('Error al guardar:', error);
      this.mensajeError = true;
    } finally {
      // Pase lo que pase, quitamos el estado de "enviando"
      this.enviando = false;
    }
  }

  // enviar() {
  //   if (this.miFormulario.invalid || this.enviando) return;

  //   this.enviando = true;
  //   this.mensajeError = '';
  //   this.exito = false;

  //   this.solicitudesService.insertarSolicitud(this.miFormulario.value).subscribe({
  //     next: () => {
  //       this.enviando = false;
  //       this.exito = true;
  //       this.miFormulario.reset({ prioridad: 1, categoria: '' });
       
  //       // Redirige a Mis Solicitudes tras 1.5 segundos de mostrar el éxito
  //       setTimeout(() => {
  //         this.router.navigate(['/solicitudes/listado']);
  //       }, 1500);
  //     },
  //     error: (err) => {
  //       this.enviando = false;
  //       this.mensajeError = err?.message;
  //     }
  //   });
  // }

  // Método para la demo
  // toggleFalloRed() {
  //   this.solicitudesService.simularFalloRed = !this.solicitudesService.simularFalloRed;
  // }
}

