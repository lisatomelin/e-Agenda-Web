import { ListarContatosViewModel } from "../../contatos/models/listar-contatos.view-model"
import TipoLocal from "./tipolocal.Enum"

export class VisualizarCompromissosViewModel{
  id: string;
  assunto: string;
  local: string;
  tipoLocal: number;
  link:	string;
  data:	Date;
  horaInicio:	string;
  horaTermino:	string;
  contato:	string;

  constructor(
    id: string,
    assunto: string,
    local: string,
    tipoLocal: number,
    link:	string,
    data:	Date,
    horaInicio:	string,
    horaTermino:	string,
    contato:	string,
  ){

    this.id= id;
    this.assunto= assunto;
    this.local= local;
    this.tipoLocal= tipoLocal;
    this.link=	link;
    this.data=	data;
    this.horaInicio=	horaInicio;
    this.horaTermino= horaTermino;
    this.contato=	contato;
  }
}