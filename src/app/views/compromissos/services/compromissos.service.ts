import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormsCompromissosViewModel } from "../models/forms-compromisso.view-model";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class CompromissosService {

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/contatos/';

  constructor(private http: HttpClient){}

  public inserir(contato: FormsCompromissosViewModel): Observable<FormsCompromissosViewModel> {
      return this.http.post<any>(this.endpoint, contato, this.obterHeadersAutorizacao())
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