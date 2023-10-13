import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCategoriasViewModel } from '../models/forms-categoria.view-models';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {
  form!: FormGroup;
  categoriasVW!: FormsCategoriasViewModel;
  

  constructor(private formBuilder: FormBuilder, 
    private categoriasService: CategoriasService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute){}


    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: new FormControl(''),
        titulo: new FormControl((''),[Validators.required]),
       
      }); 

      this.categoriasVW = this.route.snapshot.data['categoria'];    

      this.form.patchValue(this.categoriasVW);
          
    }

    gravar(){
      if(this.form.invalid){
        for(let erro of this.form.validate()){
          this.toastrService.warning(erro);
        }
  
        return;
        
      }           


      const id = this.route.snapshot.paramMap.get('id');

      if(!id) return;

  
      this.categoriasService.editar(id,this.categoriasVW).subscribe({  
        next: (categoria) => this.processarSucesso(categoria),
        error: (erro) => this.processarFalha(erro),   
  
        
      });
  
  }
  
    processarSucesso(categoria: FormsCategoriasViewModel){
  
      this.toastrService.success(
       `A categoria "${categoria.titulo}" foi editada com sucesso!`,
      'Sucesso')
  
      this.router.navigate(['/categorias/listar']);  
  
    }
  
    processarFalha(error: Error){
      this.toastrService.error(
      error.message, 'Error');           
        
    }
  

}


