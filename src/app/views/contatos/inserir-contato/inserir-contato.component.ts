import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router, RouterModule } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styleUrls: ['./inserir-contato.component.css']
})
export class InserirContatoComponent implements OnInit {

  form!: FormGroup;
  contatoVW!: FormsContatoViewModel;

  constructor(private formBuilder: FormBuilder, 
    private contatoService: ContatosService,
    private router: Router) {}
  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email:new FormControl(''),
      telefone: new FormControl (''),
      cargo: new FormControl (''),
      empresa: new FormControl (''),
    });
  }

  gravar(){
    this.contatoVW = this.form.value;

    this.contatoService.inserir(this.contatoVW).subscribe(res=> {
      console.log(res);

      this.router.navigate(['/contatos/listar']);
    });
  }

}
