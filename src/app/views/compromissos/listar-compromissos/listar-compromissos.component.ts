import { Component, OnInit } from '@angular/core';
import { ListarCompromissosViewModel } from '../models/listar-compromissos.view-model';
import { CompromissosService } from '../services/compromissos.service';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  
  compromissos: ListarCompromissosViewModel[] = [];

  constructor(private compromissosService: CompromissosService){}
  
  ngOnInit(): void {
    this.compromissosService.selecionarTodos().subscribe((res) => {
      this.compromissos= res;
      console.log(this.compromissos)
    });
  }

}
