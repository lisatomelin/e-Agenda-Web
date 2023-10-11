import { ListarContatosViewModel } from "../../contatos/models/listar-contatos.view-model";

export class ListarCompromissosViewModel{
  id: string;
  assunto: string;
  local: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  nomeContato: string;
  

  constructor(
    id: string,
    assunto: string,
    local:string,
    data: Date,
    horaInicio: string,
    horaTermino : string,
    nomeContato: string,) 
  
  {
    this.id= id;
    this.assunto = assunto;
    this.local= local;
    this.data= data ;
    this.horaInicio= horaInicio;
    this.horaTermino= horaTermino;
    this.nomeContato= nomeContato;
   
  }

}