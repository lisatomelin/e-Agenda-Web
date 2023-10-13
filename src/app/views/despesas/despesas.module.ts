import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesasRoutingModule } from './despesas-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriasModule } from '../categorias/categorias.module';
import { InserirDespesasComponent } from './inserir-despesas/inserir-despesas.component';
import { DespesasService } from './services/despesas.service';
import 'src/app/extensions/form.group.extension';

import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { EditarDespesaComponent } from './editar-despesas/editar-despesa.component';


@NgModule({
  declarations: [
    InserirDespesasComponent,
    EditarDespesaComponent,    
    ListarDespesasComponent,
    ExcluirDespesaComponent
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    CategoriasModule
  ],

  providers: [DespesasService]
})
export class DespesasModule { }
