import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatosViewModel } from '../models/listar-contatos.view-model';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatosViewModel[] = [];

  constructor(private contatoService: ContatosService){}
  
  ngOnInit(): void {
    this.contatoService.selecionarTodos().subscribe((res) => {
      this.contatos= res;
    });
  }

}
