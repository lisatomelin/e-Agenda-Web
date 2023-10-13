import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriasViewModel } from '../models/forms-categoria.view-models';
import { CategoriasService } from '../services/categorias.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent {

  form!: FormGroup;
  categoriasVW!: FormsCategoriasViewModel;

  constructor(private formBuilder: FormBuilder, 
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router){}


    ngOnInit(): void {
      this.form = this.formBuilder.group({        
        titulo: new FormControl('',[Validators.required]),
       
      });  
          
    }

    gravar(){
      if(this.form.invalid){
        for (let erro of this.form.validate()){
          this.toastrService.warning(erro);
        } 
  
        return;           
    }
  
    this.categoriasVW = this.form.value;
  
    this.categoriasService.inserir(this.categoriasVW).subscribe({
      next: (categorias: FormsCategoriasViewModel) => this.processarSucesso(categorias),
      error: (err: Error) => this.processarFalha(err),
    });
  
  }
  
    processarSucesso(categoria: FormsCategoriasViewModel){
  
      this.toastrService.success(
       `A Categoria "${categoria.titulo}" foi inserida com sucesso!`,
      'Sucesso')
  
      this.router.navigate(['/categorias/listar']);
  
  
    }
  
    processarFalha(error: Error){
      this.toastrService.error(
      error.message, 'Error');
           
        
    }
  

}
