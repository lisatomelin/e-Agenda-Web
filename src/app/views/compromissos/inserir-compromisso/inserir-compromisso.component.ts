import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsContatoViewModel } from '../../contatos/models/forms-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissosViewModel } from '../models/forms-compromisso.view-model';
import { CompromissosService } from '../services/compromissos.service';
import { ListarContatosViewModel } from '../../contatos/models/listar-contatos.view-model';
import { ContatosService } from '../../contatos/services/contatos.service';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent {
  form!: FormGroup;
  compromissoVW!: FormsCompromissosViewModel;
  contatos: ListarContatosViewModel [] = [];

  constructor(private formBuilder: FormBuilder, 
    private compromissosService: CompromissosService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private contatosService: ContatosService
    ) {}
  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl(0),
      link: new FormControl (''),
      local: new FormControl (''),
      data: new FormControl (new Date),
      horaInicio: new FormControl ('08:00'),
      horaTermino: new FormControl ('09:00'),
      contatoId: new FormControl (''),
    });

    this.contatosService.selecionarTodos().subscribe(res => {
      this.contatos = res;})

   
  }

  get assunto(){
    return this.form.get('assunto');
  }

  get tipoLocal() {
    return this.form.get('tipoLocal');
  }

  get local() {
    return this.form.get('local');
  }

  get data() {
    return this.form.get('data');
  }

  get horaInicio() {
    return this.form.get('horaInicio');
  }

  get ContatoId() {
    return this.form.get('contatoId');
  }



  gravar(){
    if(this.form.invalid){
      this.toastrService.warning('Verifique o preenchimento do formulário.', 'Aviso!');
      
      this.form.markAllAsTouched();
      return;
    }

    this.compromissoVW = this.form.value;

    this.compromissosService.inserir(this.compromissoVW).subscribe({
      next: this.processarSucesso,
      error: (err:Error) => this.processarFalha(err),

    });

     
    
  }


  processarSucesso(res: FormsCompromissosViewModel){

    this.toastrService.success(
     `O contato "${res.assunto}" foi inserido com sucesso!`,
    'Sucesso')

    this.router.navigate(['/compromissos/listar']);


  }

  processarFalha(error: Error){
    this.toastrService.error(
    error.message, 'Error');
         
      
    
  }


}
