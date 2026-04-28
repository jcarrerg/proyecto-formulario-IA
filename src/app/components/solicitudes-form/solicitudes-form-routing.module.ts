import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesFormComponent } from './solicitudes-form.component';

const routes: Routes = [{path:'',component:SolicitudesFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesFormRoutingModule { }
