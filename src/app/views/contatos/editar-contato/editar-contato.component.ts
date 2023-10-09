import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVW!: FormsContatoViewModel;
  

  constructor(
    private formBuilder: FormBuilder, 
    private contatoService: ContatosService,
    private router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute) {}
  
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl ('', [Validators.required]),
      cargo: new FormControl ('', [Validators.required]),
      empresa: new FormControl ('', [Validators.required]),
    });


      this.contatoVW = this.route.snapshot.data['contato'];

    

      this.form.patchValue(this.contatoVW);

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
      for(let erro of this.form.validate()){
        this.toastrService.warning(erro);
      }

      return;
      
    }
    this.contatoVW = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.contatoService.editar(id,this.contatoVW).subscribe({  
      next: (contato) => this.processarSucesso(contato),
      error: (erro) => this.processarFalha(erro),   

      
    });
  }

  processarSucesso(contato: FormsContatoViewModel){

    this.toastrService.success(
     `O contato "${contato.nome}" foi editado com sucesso!`,
    'Sucesso')

    this.router.navigate(['/contatos/listar']);


  }

  processarFalha(error: Error){
    this.toastrService.error(
    error.message, 'Error');
         
      
  }
}
