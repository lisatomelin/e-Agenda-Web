import { NgModule } from "@angular/core";
import { ListarCategoriasComponent } from "./listar-categorias/listar-categorias.component";
import { InserirCategoriaComponent } from "./inserir-categoria/inserir-categoria.component";
import { ExcluirCategoriaComponent } from "./excluir-categoria/excluir-categoria.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriasService } from "./services/categorias.service";
import 'src/app/extensions/form.group.extension';
import { CategoriasRoutingModule } from "./categorias-routing.module";
import { CardCategoriaComponent } from "./card-categoria/card-categoria.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";


@NgModule({

  declarations: [

    ListarCategoriasComponent,
    InserirCategoriaComponent,
    ExcluirCategoriaComponent,  
    CardCategoriaComponent,
    EditarCategoriaComponent,
    
    
  ],
  imports: [CommonModule, ReactiveFormsModule, CategoriasRoutingModule ],

  providers: [CategoriasService],

})

export class CategoriasModule { }