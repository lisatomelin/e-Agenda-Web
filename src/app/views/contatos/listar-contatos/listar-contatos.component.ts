import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatosViewModel } from '../models/listar-contatos.view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatosViewModel[] = [];

  constructor(private contatoService: ContatosService, private route: ActivatedRoute, private toastrService: ToastrService)
  
  {}
  
  ngOnInit(): void {
      
  this.route.data.pipe(map(dados => dados ['contatos'])).subscribe({
    next: (contatos) => this.processarSucesso(contatos),
    error: (erro) => this.processarFalha(erro),
  });
  }    
  

  processarSucesso(contatos: ListarContatosViewModel[]){

    this.contatos = contatos;

  }

  processarFalha(error: Error){
    this.toastrService.error(
    error.message, 'Error');
         
      
  }

}


