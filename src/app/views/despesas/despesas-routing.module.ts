import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { EditarDespesaComponent } from './editar-despesas/editar-despesa.component';
import { FormsDespesasViewModel } from './models/forms-despesas.view-model';
import { DespesasService } from './services/despesas.service';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';

const formsDespesasResolver: ResolveFn<FormsDespesasViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!)
  };

  const visualizarDespesaResolver = (route: ActivatedRouteSnapshot) => {
    return inject(DespesasService).selecionarDespesasCompletoPorId(route.paramMap.get('id')!);
  }
  
  const listarDespesasResolver = () => {
    return inject(DespesasService).selecionarTodos();
  }


const routes: Routes = [

  {
    path: '',
    redirectTo:'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: ListarDespesasComponent,
    resolve: {despesas: listarDespesasResolver}
  },

  {
    path: 'inserir',
    component: InserirDespesasComponent,
  },

  {
    path: 'editar/:id',
    component: EditarDespesaComponent,
    resolve: {despesas: formsDespesasResolver},
  },

  {
    path: 'excluir/:id',
    component: ExcluirDespesaComponent,
    resolve: {despesa: visualizarDespesaResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
