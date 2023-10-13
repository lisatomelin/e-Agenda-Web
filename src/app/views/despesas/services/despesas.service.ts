import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsDespesasViewModel } from "../models/forms-despesas.view-model";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable()
export class DespesasService{
  private endpoint: string = 
  'https://e-agenda-web-api.onrender.com/api/despesas/';

  constructor(private http: HttpClient){}

  public inserir(despesa: FormsDespesasViewModel): Observable<FormsDespesasViewModel> {
    return this.http.post<any>(this.endpoint, despesa, this.obterHeadersAutorizacao())
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, despesa: FormsDespesasViewModel){
    return this.http.put<any>(
      this.endpoint + id, despesa, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  // public selecionarTodos(): Observable<ListarDespesasViewModel[]> {
  //   return this.http.get<any>(this.endpoint, this.obterHeadersAutorizacao())
  //   .pipe(map((res) => res.dados),
  //   catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  // }

  public selecionarPorId(id: string): Observable<FormsDespesasViewModel>{
    return this.http.get<any>(this.endpoint+id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
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