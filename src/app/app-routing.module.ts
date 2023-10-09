import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatoComponent } from './views/contatos/inserir-contato/inserir-contato.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './views/contatos/editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './views/contatos/excluir-contato/excluir-contato.component';
import { InserirCompromissoComponent } from './views/compromissos/inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { EditarCompromissoComponent } from './views/compromissos/editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './views/compromissos/excluir-compromisso/excluir-compromisso.component';
import { FormsContatoViewModel } from './views/contatos/models/forms-contato.view-model';
import { ContatosService } from './views/contatos/services/contatos.service';
import { VisualizarContatoViewModel } from './views/contatos/models/visualizar-contato.view-model';
import { ListarContatosViewModel } from './views/contatos/models/listar-contatos.view-model';

const listarContatosResolver: ResolveFn<ListarContatosViewModel[]> = () => {
  
    return inject(ContatosService).selecionarTodos();
};

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!)
};

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(ContatosService).selecionarContatoCompletoPorId(route.paramMap.get('id')!)
};




const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch :'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'contatos/inserir',
    component: InserirContatoComponent,
  },  
  {
    path: 'contatos/editar/:id',
    component: EditarContatoComponent,
    resolve: {contato: formsContatoResolver},
  },
  {
    path: 'contatos/excluir/:id',
    component: ExcluirContatoComponent,
    resolve: {contato: visualizarContatoResolver},
  },
  {
    path: 'contatos/listar',
    component: ListarContatosComponent,
    resolve: {contatos: listarContatosResolver},
  },

  {
    path: 'compromissos/inserir',
    component: InserirCompromissoComponent,
  }, 
  {
    path: 'compromissos/editar/:id',
    component: EditarCompromissoComponent,
  },
  {
    path: 'compromissos/excluir/:id',
    component: ExcluirCompromissoComponent,
  },

  {
    path: 'compromissos/listar',
    component: ListarCompromissosComponent,
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
