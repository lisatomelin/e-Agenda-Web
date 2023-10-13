import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { EditarDespesasComponent } from './editar-despesas/editar-despesas.component';
import { FormsDespesasViewModel } from './models/forms-despesas.view-model';
import { DespesasService } from './services/despesas.service';

const formsDespesasResolver: ResolveFn<FormsDespesasViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!)
  };


const routes: Routes = [

  {
    path: '',
    redirectTo:'listar',
    pathMatch: 'full',
  },

  {
    path: 'inserir',
    component: InserirDespesasComponent,
  },

  {
    path: 'editar/:id',
    component: EditarDespesasComponent,
    resolve: {contato: formsDespesasResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
