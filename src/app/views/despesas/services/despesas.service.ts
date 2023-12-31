import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsDespesasViewModel } from "../models/forms-despesas.view-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { VisualizarDespesaViewModel } from "../models/visualizar-despesas.view-model";
import { ListarDespesaViewModel } from "../models/listar-despesas.view.model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class DespesasService{
  private endpoint: string = 
  'https://e-agenda-web-api.onrender.com/api/despesas/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService){}

  public inserir(despesa: FormsDespesasViewModel): Observable<FormsDespesasViewModel> {
    return this.http.post<any>(this.endpoint, despesa)
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, despesa: FormsDespesasViewModel){
    return this.http.put<any>(
      this.endpoint + id, despesa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(this.endpoint + id)
  }


  public selecionarTodos(): Observable<ListarDespesaViewModel[]> {
    return this.http.get<any>(this.endpoint)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarPorId(id: string): Observable<FormsDespesasViewModel>{
    return this.http.get<any>(this.endpoint+id)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarDespesasCompletoPorId(id: string): Observable<VisualizarDespesaViewModel>
  {
    return this.http
    .get<any>(
      this.endpoint + 'visualizacao-completa/' + id)
    .pipe(map((res) => res.dados),
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


}