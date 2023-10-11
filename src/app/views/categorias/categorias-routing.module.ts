import { ResolveFn, RouterModule, Routes } from "@angular/router";
import { InserirCategoriaComponent } from "./inserir-categoria/inserir-categoria.component";
import { ExcluirCompromissoComponent } from "../compromissos/excluir-compromisso/excluir-compromisso.component";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { NgModule, inject } from "@angular/core";
import { ListarCategoriasViewModel } from "./models/listar-categorias.view-model";
import { CategoriasService } from "./services/categorias.service";

const listarCategoriasResolver: ResolveFn<ListarCategoriasViewModel[]> = () => {
  return inject(CategoriasService).selecionarTodos();
};

// const formsCategoriasResolver: ResolveFn<FormsCategoriasViewModel> = (
//   route: ActivatedRouteSnapshot) => {
//     return inject(CategoriasService).selecionarPorId(route.paramMap.get('id')!)
// };

// const visualizarCaegoriasResolver: ResolveFn<VisualizarCategoriasViewModel> = (
//   route: ActivatedRouteSnapshot) => {
//     return inject(CategoriasService).selecionarContatoCompletoPorId(route.paramMap.get('id')!)
// };


const routes: Routes = [

  {
    path: '',
    redirectTo:'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: ListarCategoriasComponent,
    resolve: {categoria: listarCategoriasResolver},
  }, 

  {
    path: 'inserir',
    component: InserirCategoriaComponent,
    
  }, 
  // {
  //   path: 'editar/:id',
  //   component: EditarCategoriaComponent,
  //   resolve: {categoria: formsCategoriaResolver},
  // },
  {
    path: 'excluir/:id',
    component: ExcluirCompromissoComponent,
    // resolve: {categoria: visualizarCategoriaResolver},
  },

 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})


export class CategoriasRoutingModule {}