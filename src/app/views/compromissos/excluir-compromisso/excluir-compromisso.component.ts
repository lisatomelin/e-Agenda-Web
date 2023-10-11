import { Component } from '@angular/core';
import { VisualizarCompromissosViewModel } from '../models/visualizar-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ListarContatosViewModel } from '../../contatos/models/listar-contatos.view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent {
  compromissoVM: VisualizarCompromissosViewModel;
  idSelecionado: string | null = null;
  contatos: ListarContatosViewModel [] = [];

  constructor( 
    private compromissosService: CompromissosService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private contatosService: ContatosService) {

      this.compromissoVM = new VisualizarCompromissosViewModel('','', '', 0, '',new Date(), '', '');
    }
  
    ngOnInit(): void {
      this.idSelecionado = this.route.snapshot.paramMap.get('id');

      if(!this.idSelecionado) return;

      this.compromissosService.selecionarContatoCompletoPorId(this.idSelecionado).subscribe((res) => {
        this.compromissoVM = res;
    });

    this.contatosService.selecionarTodos().subscribe(res => {
      this.contatos = res;})

  }

  gravar(){
    this.compromissosService.excluir(this.idSelecionado!)
    .subscribe((res)=> {
      this.router.navigate(['/compromissos','listar'])
      this.toastrService.success(`O compromisso "${res.nome}" foi excluído com sucesso!`)
      
    });

  }

}
