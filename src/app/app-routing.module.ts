import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesFormComponent } from './components/solicitudes-form/solicitudes-form.component';
import { MisSolicitudesComponent } from './components/mis-solicitudes/mis-solicitudes.component';

const routes: Routes = [
  {path:'solicitudes-form',component: SolicitudesFormComponent},
  {path:'mis-solicitudes', component: MisSolicitudesComponent},
  
  {path:'**', redirectTo: 'solicitudes-form', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
