import TipoLocal from "./tipolocal.Enum";

export class FormsCompromissosViewModel{
  assunto: string;
  tipoLocal: number;
  link: string;
  local: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;

  constructor(
  assunto: string,
  tipoLocal: number,
  link: string,
  local: string,
  data: Date,
  horaInicio: string,
  horaTermino: string,
  contatoId?: string
  ) {
    this.assunto = assunto;
    this.tipoLocal = tipoLocal;
    this.link= link;
    this.local= local;
    this.data= data ;
    this.horaInicio= horaInicio;
    this.horaTermino= horaTermino;
    this.contatoId= contatoId;

  }

}


