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
  idSelecionado: string | null = null;

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

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado) return;

    this.contatoService.selecionarPorId(this.idSelecionado).subscribe((res) => {

      this.form.patchValue(res);

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
      this.toastrService.warning('Verifique o preenchimento do formulário.', 'Aviso!');
      
      this.form.markAllAsTouched();
      return;
    }
    this.contatoVW = this.form.value;

    this.contatoService.editar(this.idSelecionado!,this.contatoVW).subscribe(res=> {
      this.toastrService.success(`O contato "${res.nome}" foi editado com sucesso!`)

      this.router.navigate(['/contatos/listar']);
    });
  }
}
