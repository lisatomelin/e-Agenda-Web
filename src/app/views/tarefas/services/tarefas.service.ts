import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsTarefaViewModel } from "../models/forms-tarefa.view-models";
import { Observable, catchError, map, throwError } from "rxjs";
import { ListarTarefasViewModel } from "../models/listar-tarefas.view-model";
import { VisualizarTarefaViewModel } from "../models/visualizar-tarefa.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class TarefasService{

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService){}

  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    return this.http.post<any>(this.endpoint, tarefa)
    .pipe(
      map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, tarefa: FormsTarefaViewModel){
    return this.http.put<any>(
      this.endpoint + id, tarefa)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any>{
    return this.http.delete(this.endpoint + id)
  }


  public selecionarTodos(): Observable<ListarTarefasViewModel[]> {
    return this.http.get<any>(this.endpoint)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel>{
    return this.http.get<any>(this.endpoint+id)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarTarefasCompletoPorId(id: string): Observable<VisualizarTarefaViewModel>
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

