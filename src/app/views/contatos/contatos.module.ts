import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contatos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    InserirContatoComponent,
    ListarContatosComponent
  ],
  imports: 
  [CommonModule,ReactiveFormsModule, RouterModule],    

  providers: [ContatosService],
})
export class ContatosModule { }
