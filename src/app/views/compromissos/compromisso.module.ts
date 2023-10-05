import { NgModule } from "@angular/core";
import { InserirCompromissoComponent } from "./inserir-compromisso/inserir-compromisso.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";
import { EditarCompromissoComponent } from "./editar-compromisso/editar-compromisso.component";
import { ExcluirCompromissoComponent } from "./excluir-compromisso/excluir-compromisso.component";
import { CompromissosService } from "./services/compromissos.service";

@NgModule({

  declarations: [
    InserirCompromissoComponent,
    ListarCompromissosComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
  ],
  imports: 
  [CommonModule,ReactiveFormsModule, RouterModule],    
  
  providers: [CompromissosService],
})



export class CompromissosModule { }