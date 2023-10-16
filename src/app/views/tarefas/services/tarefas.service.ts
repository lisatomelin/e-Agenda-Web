import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsTarefaViewModel } from "../models/forms-tarefas.view-models";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TarefasService{

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient){}

  public inserir(tarefas: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    return this.http.post<any>(this.endpoint, tarefas, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }


  private processarErroHttp(erro: HttpErrorResponse){
    let mensagemErro = '';

    if(erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
      
    if(erro.status == 401)
      mensagemErro = 'O usuário não está autorizado. Efetue o login e tente novamente.';

    else mensagemErro = erro.error?.erros(0);

    return throwError(() => new Error(mensagemErro));
  }


  private obterHeadersAutorizacao(){
    const token = environment.apiKey;

    return{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:`Bearer ${token}`,
      }),
    };


  }

}