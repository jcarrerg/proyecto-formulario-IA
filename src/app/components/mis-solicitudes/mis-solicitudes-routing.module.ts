import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisSolicitudesComponent } from './mis-solicitudes.component';

const routes: Routes = [{path:'',component:MisSolicitudesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class misSolicitudesRoutingModule { }
