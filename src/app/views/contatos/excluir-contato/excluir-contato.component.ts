import { Component, OnInit } from '@angular/core';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css']
})
export class ExcluirContatoComponent implements OnInit{
  contatoVM: VisualizarContatoViewModel;
  

  constructor( 
    private contatoService: ContatosService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) {

      this.contatoVM = new VisualizarContatoViewModel('','', '', '', '','');
    }
  
    ngOnInit(): void {
      

      
    this.contatoVM = this.route.snapshot.data['contato'];
    
  }

  gravar(){

   const id = this.route.snapshot.paramMap.get('id');

      if(!id) return;
    this.contatoService.excluir(id)
    .subscribe(res=> {
      this.toastrService.success(`O contato "${res.nome}" foi excluído com sucesso!`)
      this.router.navigate(['/contatos','listar'])
    });

  }

}
