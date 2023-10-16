import { StatusItemTarefa } from "./status-item-tarefa-Enum";

export type ItemTarefaViewModel = {
  id?: string;
  titulo: string;
  status: StatusItemTarefa;
  concluido: boolean;
};