import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ListarContatosViewModel } from "../models/listar-contatos.view-model";
import { map } from "rxjs";
import { VisualizarContatoViewModel } from "../models/visualizar-contato.view-model";

@Injectable()
export class ContatosService {

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/contatos/';

  constructor(private http: HttpClient){}

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
      return this.http.post<any>(this.endpoint, contato, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
    }

  public editar(id: string, contato: FormsContatoViewModel){
    return this.http.put<any>(
      this.endpoint + id, contato, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete<any>(this.endpoint+id, this.obterHeadersAutorizacao());
  }

  public selecionarTodos(): Observable<ListarContatosViewModel[]> {
    return this.http.get<any>(this.endpoint, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel>{
    return this.http.get<any>(this.endpoint+id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  public selecionarContatoCompletoPorId(id: string): Observable<VisualizarContatoViewModel>{
    return this.http.get<any>(this.endpoint + 'visualizacao-completa/' + id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
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