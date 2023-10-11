import { NgModule } from "@angular/core";
import { InserirCompromissoComponent } from "./inserir-compromisso/inserir-compromisso.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ListarCompromissosComponent } from "./listar-compromissos/listar-compromissos.component";
import { EditarCompromissoComponent } from "./editar-compromisso/editar-compromisso.component";
import { ExcluirCompromissoComponent } from "./excluir-compromisso/excluir-compromisso.component";
import { CompromissosService } from "./services/compromissos.service";
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';
import { CompromissosRoutingModule } from "./compromissos-routing.module";
import { ContatosModule } from "../contatos/contatos.module";
import 'src/app/extensions/form.group.extension';

@NgModule({

  declarations: [
    InserirCompromissoComponent,
    ListarCompromissosComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
    CardCompromissoComponent,
  ],
  imports: 
  [CommonModule,ReactiveFormsModule, CompromissosRoutingModule, ContatosModule],    
  
  providers: [CompromissosService],
})



export class CompromissosModule { }