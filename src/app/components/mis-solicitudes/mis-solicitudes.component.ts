import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../solicitudes.service';
import { Formulario } from '../../interface-formulario/formulario.interface';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.scss']
})
export class MisSolicitudesComponent implements OnInit {
  solicitudes: Formulario[] = [];

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    // Nos suscribimos a los datos reales de Supabase
    this.solicitudesService.solicitudes$.subscribe(data => {
      this.solicitudes = data;
    });
  }
}