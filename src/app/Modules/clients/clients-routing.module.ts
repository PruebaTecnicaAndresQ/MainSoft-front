import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagerComponent } from './client-manager/client-manager.component';

const routes: Routes = [
  {
    path:'clientManager',
    component:ClientManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
