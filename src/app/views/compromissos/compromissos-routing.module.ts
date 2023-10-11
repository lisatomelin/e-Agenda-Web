import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarCompromissosViewModel } from "./models/listar-compromissos.view-model";
import { CompromissosService } from "./services/compromissos.service";
import { FormsCompromissosViewModel } from "./models/forms-compromisso.view-model";
import { VisualizarCompromissosViewModel } from "./models/visualizar-compromisso.view-model";
import { InserirCompromissoComponent } from "./inserir-compromisso/inserir-compromisso.component";
import { EditarCompromissoComponent } from "./editar-compromisso/editar-compromisso.component";
import { ExcluirCompromissoComponent } from "./excluir-compromisso/excluir-compromisso.component";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";


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
    path: '',
    redirectTo:'listar',
    pathMatch: 'full',
  },

  {
    path: 'inserir',
    component: InserirCompromissoComponent,
    
  }, 
  {
    path: 'editar/:id',
    component: EditarCompromissoComponent,
    resolve: {compromisso: formsCompromissoResolver},
  },
  {
    path: 'excluir/:id',
    component: ExcluirCompromissoComponent,
    resolve: {compromisso: visualizarCompromissoResolver},
  },

  {
    path: 'listar',
    component: ListarCompromissosComponent,
    resolve: {compromissos: listarCompromissosResolver},
  }, 

]

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  
  })

  
  export class CompromissosRoutingModule {}


