import { Component, Input } from '@angular/core';
import { ListarContatosViewModel } from '../models/listar-contatos.view-model';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent {
 @Input ({required: true}) contato!: ListarContatosViewModel;

}
