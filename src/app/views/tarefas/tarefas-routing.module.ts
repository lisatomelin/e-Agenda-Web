import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirTarefasComponent } from './inserir-tarefas/inserir-tarefas.component';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { TarefasService } from './services/tarefas.service';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { FormsTarefaViewModel } from './models/forms-tarefa.view-models';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';

const listarTarefasResolver = () => { return inject(TarefasService).selecionarTodos();}

const visualizarTarefasResolver = (route: ActivatedRouteSnapshot) => {
  return inject(TarefasService).selecionarTarefasCompletoPorId(route.paramMap.get('id')!);}

const formsTarefaResolver: ResolveFn<FormsTarefaViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(TarefasService).selecionarPorId(route.paramMap.get('id')!);}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: ListarTarefasComponent,
    resolve: {tarefas: listarTarefasResolver},
  },
  {
    path: 'inserir',
    component: InserirTarefasComponent,
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: {tarefa: formsTarefaResolver},
  },

  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent,
    resolve: {tarefa: visualizarTarefasResolver},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
