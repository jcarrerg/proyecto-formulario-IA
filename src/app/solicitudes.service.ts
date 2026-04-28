import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Formulario } from './interface-formulario/formulario.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private readonly supabase: SupabaseClient;

  // Estado interno controlado
  private readonly solicitudesSubject = new BehaviorSubject<Formulario[]>([]);
  public readonly solicitudes$: Observable<Formulario[]> =
    this.solicitudesSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    this.cargarSolicitudes().subscribe();
  }

  /**
   * Carga todas las solicitudes desde Supabase
   */
  cargarSolicitudes(): Observable<Formulario[]> {
    return from(
      this.supabase
        .from('solicitudes')
        .select('*')
        .order('created_at', { ascending: false }),
    ).pipe(
      map((response) => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Formulario[];
      }),
      tap((data) => this.solicitudesSubject.next(data)),
      catchError((error) => {
        console.error('Error al cargar solicitudes:', error);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Inserta una nueva solicitud en Supabase
   */
  insertarSolicitud(solicitud: Formulario): Observable<Formulario> {
    return from(
      this.supabase.from('solicitudes').insert([solicitud]).select().single(),
    ).pipe(
      map((response) => {
        if (response.error) {
          throw response.error;
        }
        return response.data as Formulario;
      }),
      tap((nuevaSolicitud) => {
        const actuales = this.solicitudesSubject.getValue();
        this.solicitudesSubject.next([nuevaSolicitud, ...actuales]);
      }),
      catchError((error) => {
        console.error('Error al insertar solicitud:', error);
        return throwError(() => error);
      }),
    );
  }
}
