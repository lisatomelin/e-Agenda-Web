import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { FormsContatoViewModel } from "../models/forms-contato.view-model";
import { ListarContatosViewModel } from "../models/listar-contatos.view-model";
import { map } from "rxjs";

@Injectable()
export class ContatosService {

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/contatos/';

  constructor(private http: HttpClient){}

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
      return this.http.post<any>(this.endpoint, contato, this.obterHeadersAutorizacao());
  }

  public editar(id: string, contato: FormsContatoViewModel){
    return this.http.put<any>(
      this.endpoint + id, contato, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarContatosViewModel[]> {
    return this.http.get<any>(this.endpoint, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel>{
    return this.http.get<any>(this.endpoint+id, this.obterHeadersAutorizacao())
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