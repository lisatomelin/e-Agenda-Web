import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ListarContatosViewModel } from "../models/listar-contatos.view-model";
import { catchError, map, throwError } from "rxjs";
import { VisualizarContatoViewModel } from "../models/visualizar-contato.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class ContatosService {

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/contatos/';

  constructor(private http: HttpClient, private LocalStorage: LocalStorageService){}

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
      return this.http
      .post<any>(this.endpoint, contato)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
             
      );
    }

  public editar(id: string, contato: FormsContatoViewModel){
    return this.http.put<any>(
      this.endpoint + id, contato)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint+id).pipe(
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarTodos(): Observable<ListarContatosViewModel[]> {
    return this.http.get<any>(this.endpoint)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel>{
    return this.http.get<any>(this.endpoint+id)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarContatoCompletoPorId(id: string): Observable<VisualizarContatoViewModel>
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