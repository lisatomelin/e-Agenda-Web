import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { FormsCategoriasViewModel } from "../models/forms-categoria.view-models";
import { ListarCategoriasViewModel } from "../models/listar-categorias.view-model";
import { VisualizarCategoriaViewModel } from "../models/visualizar-categoria.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class CategoriasService {

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/categorias/';

  constructor(private http: HttpClient, private localStorage: LocalStorageService){}

  public inserir(categorias: FormsCategoriasViewModel): Observable<FormsCategoriasViewModel> {
      return this.http.post<any>(this.endpoint, categorias)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public editar(id: string, categorias: FormsCategoriasViewModel){
    return this.http.put<any>(
      this.endpoint + id, categorias)
      .pipe(map((res) => res.dados),
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint+id)
    .pipe(
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
    );
  }

  public selecionarTodos(): Observable<ListarCategoriasViewModel[]> {
    return this.http.get<any>(this.endpoint)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsCategoriasViewModel>{
    return this.http.get<any>(this.endpoint+id)
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

    public selecionarCategoriaCompletoPorId(id: string): Observable<VisualizarCategoriaViewModel>
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