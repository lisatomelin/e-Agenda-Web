import { Component, Input } from '@angular/core';
import { ListarCompromissosViewModel } from '../models/listar-compromissos.view-model';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent {
  @Input ({required: true}) compromisso!: ListarCompromissosViewModel;
}
