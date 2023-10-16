import { ItemTarefaViewModel } from "./item-tarefa.view-model";
import { PrioridadeTarefaEnum } from "./prioridade-tarefa-Enum";

export type FormsTarefaViewModel = {
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens: ItemTarefaViewModel[];
};