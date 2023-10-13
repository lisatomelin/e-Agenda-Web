import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriasService } from '../services/categorias.service';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria.view-model';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent implements OnInit{
  categoriasVM: VisualizarCategoriaViewModel;
  idSelecionado: string | null = null;
  

  constructor( 
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) {

      this.categoriasVM = new VisualizarCategoriaViewModel('','');
    }
  
  ngOnInit(): void {

      
    this.categoriasVM = this.route.snapshot.data['categoria'];
    
  }

  gravar(){

    const id = this.route.snapshot.paramMap.get('id');

      if(!id) return;

    this.categoriasService.excluir(id)
    .subscribe(res=> {
      this.router.navigate(['/categorias','listar'])
      this.toastrService.success(`A categoria "${res.nome}" foi excluída com sucesso!`)
      
    });

  }

}
