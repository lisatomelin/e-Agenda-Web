import { Inject, NgModule } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes, UrlTree } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { Observable, map } from 'rxjs';
import { AuthService } from './core/auth/services/auth.service';
import { authGuard } from './core/auth/guards/auth.guard';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch :'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./views/compromissos/compromisso.module').then(m => m.CompromissosModule),
    canActivate: [authGuard],
  },

  {
    path:'contatos',
    loadChildren: () => import('./views/contatos/contatos.module').then(m => m.ContatosModule),
    canActivate: [authGuard],

  }, 

  {
    path:'categorias',
    loadChildren: () => import('./views/categorias/categorias.module').then(m => m.CategoriasModule),
    canActivate: [authGuard],

  }, 

  {
    path:'despesas',
    loadChildren: () => import('./views/despesas/despesas.module').then(m => m.DespesasModule),
    canActivate: [authGuard],

  }, 

  {
    path:'tarefas',
    loadChildren: () => import('./views/tarefas/tarefas.module').then(m => m.TarefasModule),
    canActivate: [authGuard],

  }, 
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
