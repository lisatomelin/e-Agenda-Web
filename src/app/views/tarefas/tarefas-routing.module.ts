import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirTarefasComponent } from './inserir-tarefas/inserir-tarefas.component';

const routes: Routes = [
  {
    path: 'inserir',
    component: InserirTarefasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarefasRoutingModule { }
