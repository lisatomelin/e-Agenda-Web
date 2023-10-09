import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router} from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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
    private toastrService: ToastrService,
    private router: Router,
    ) {}
  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl ('', [Validators.required]),
      cargo: new FormControl ('', [Validators.required]),
      empresa: new FormControl ('', [Validators.required]),
    });
  }

  get nome(){
    return this.form.get('nome');
  }

  get email() {
    return this.form.get('email');
  }

  get telefone() {
    return this.form.get('telefone');
  }

  get cargo() {
    return this.form.get('cargo');
  }

  get empresa() {
    return this.form.get('empresa');
  }

  gravar(){
    if(this.form.invalid){
      for (let erro of this.form.validate()){
        this.toastrService.warning(erro);
      } 

      return;
         
  }

  this.contatoVW = this.form.value;

  this.contatoService.inserir(this.contatoVW).subscribe({
    next: (contato: FormsContatoViewModel) => this.processarSucesso(contato),
    error: (err: Error) => this.processarFalha(err),
  });

}

  processarSucesso(contato: FormsContatoViewModel){

    this.toastrService.success(
     `O contato "${contato.nome}" foi inserido com sucesso!`,
    'Sucesso')

    this.router.navigate(['/contatos/listar']);


  }

  processarFalha(error: Error){
    this.toastrService.error(
    error.message, 'Error');
         
      
  }

}