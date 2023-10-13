import { FormaPagamentoEnum } from "./forma-pagamento.enum";

export type FormsDespesasViewModel = {

  descricao:string;
  valor: number;
  data: Date;
  formaPagamento: FormaPagamentoEnum;
  categoriasSelecionadas: string[];
}