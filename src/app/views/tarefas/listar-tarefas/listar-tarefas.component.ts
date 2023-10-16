import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarTarefasViewModel } from '../models/listar-tarefas.view-model';

@Component({
  selector: 'app-listar-tarefas',
  templateUrl: './listar-tarefas.component.html',
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent implements OnInit{

  tarefas: ListarTarefasViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }

}
