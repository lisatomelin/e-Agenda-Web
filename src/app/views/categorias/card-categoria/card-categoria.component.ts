import { Component, Input } from '@angular/core';
import { ListarCategoriasViewModel } from '../models/listar-categorias.view-model';

@Component({
  selector: 'app-card-categoria',
  templateUrl: './card-categoria.component.html',
  styleUrls: ['./card-categoria.component.css']
})
export class CardCategoriaComponent {
  @Input ({required: true}) categorias!: ListarCategoriasViewModel;

}
