import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListarCategoriasViewModel } from '../../categorias/models/listar-categorias.view-model';
import { DespesasService } from '../services/despesas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../../categorias/services/categorias.service';

@Component({
  selector: 'app-inserir-despesas',
  templateUrl: './inserir-despesas.component.html',
  styleUrls: ['./inserir-despesas.component.css']
})
export class InserirDespesasComponent implements OnInit{
  form?: FormGroup;

  categorias: ListarCategoriasViewModel[] = [];

  constructor(
    private despesasService: DespesasService,
    private toastrService: ToastrService,
    private categoriaService: CategoriasService,
    private router: Router,
    private formsBuilder: FormBuilder,
    )
    {}
  
    ngOnInit(): void {
    this.form = this.formsBuilder.group({
      descricao: new FormControl('', [Validators.required,Validators.minLength(3)]),
      valor: new FormControl(0, [Validators.required,Validators.min(0.1)]),
      data: new FormControl(new Date().toString().substring(0, 10), [Validators.required]),
      formaPagamento: new FormControl(0, [Validators.required]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.categoriaService.selecionarTodos().subscribe((res) => (this.categorias = res));
  }

  campoEstaInvalido(nome: string) {
    return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
  }

  gravar(){
    if(this.form?.invalid){
      for(let erro of this.form.validate()) 
        this.toastrService.warning(erro);

      return;
    }

    this.despesasService.inserir(this.form?.value).subscribe(res => {
      this.toastrService.success(`A despesa ${res.descricao} foi cadastrado com sucesso!`, 'Sucesso')
      this.router.navigate(['/despesas/listar'])
    })
  }

}

  

