import { Component, OnInit } from '@angular/core';
import { ListarCategoriasViewModel } from '../models/listar-categorias.view-model';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {

  categorias: ListarCategoriasViewModel[] = [];

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
     this.categoriasService.selecionarTodos().subscribe((res) => {
      this.categorias = res;
      console.log(this.categorias)
    });
  }
  
}
