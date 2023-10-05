export class ListarCompromissooViewModel{
  assunto: string;
  local: string;
  data: string;
  horaInicio: string;
  

  constructor(
  assunto: string,
  local:string,
  data: string,
  horaInicio: string,
  
  ) {
    this.assunto = assunto;
    this.local= local;
    this.data= data ;
    this.horaInicio= horaInicio;
   
  }

}