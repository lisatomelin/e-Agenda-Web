import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirCompromissoComponent } from './views/compromissos/inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './views/compromissos/listar-compromissos/listar-compromissos.component';
import { EditarCompromissoComponent } from './views/compromissos/editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './views/compromissos/excluir-compromisso/excluir-compromisso.component';
import { CompromissosService } from './views/compromissos/services/compromissos.service';
import { ListarCompromissosViewModel } from './views/compromissos/models/listar-compromissos.view-model';
import { FormsCompromissosViewModel } from './views/compromissos/models/forms-compromisso.view-model';
import { VisualizarCompromissosViewModel } from './views/compromissos/models/visualizar-compromisso.view-model';



const listarCompromissosResolver: ResolveFn<ListarCompromissosViewModel[]> = () => {
  return inject(CompromissosService).selecionarTodos();
};

const formsCompromissoResolver: ResolveFn<FormsCompromissosViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(CompromissosService).selecionarPorId(route.paramMap.get('id')!)
};

const visualizarCompromissoResolver: ResolveFn<VisualizarCompromissosViewModel> = (
  route: ActivatedRouteSnapshot) => {
    return inject(CompromissosService).selecionarContatoCompletoPorId(route.paramMap.get('id')!)
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
    path:'contatos',
    loadChildren: () => import('./views/contatos/contatos.module').then(m => m.ContatosModule)

  },

 


  {
    path: 'compromissos/inserir',
    component: InserirCompromissoComponent,
    
  }, 
  {
    path: 'compromissos/editar/:id',
    component: EditarCompromissoComponent,
    resolve: {compromisso: formsCompromissoResolver}
  },
  {
    path: 'compromissos/excluir/:id',
    component: ExcluirCompromissoComponent,
    resolve: {compromisso: visualizarCompromissoResolver}
  },

  {
    path: 'compromissos/listar',
    component: ListarCompromissosComponent,
    resolve: {compromissos: listarCompromissosResolver},
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
