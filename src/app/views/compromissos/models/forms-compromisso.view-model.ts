import { TipoLocal } from "./tipolocal.Enum";


export class FormsCompromissosViewModel{
  assunto: string;
  tipoLocal: TipoLocal;
  link: string;
  local: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato?: string;

  constructor(
  assunto: string,
  tipoLocal: TipoLocal,
  link: string,
  local: string,
  data: Date,
  horaInicio: string,
  horaTermino: string,
  contato?: string
  ) {
    this.assunto = assunto;
    this.tipoLocal = tipoLocal;
    this.link= link;
    this.local= local;
    this.data= data ;
    this.horaInicio= horaInicio;
    this.horaTermino= horaTermino;
    this.contato= contato;

  }

}


