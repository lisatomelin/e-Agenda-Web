import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from "rxjs";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { TokenViewModel } from "../models/token.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model copy";
import { UsuarioTokenViewModel } from "../models/usuario-token.view-model";

@Injectable()
export class AuthService{

  private endpoint: string =
  'https://e-agenda-web-api.onrender.com/api/conta/';

  private endpointRegistrar: string = this.endpoint + 'registrar';
  private endpointLogin: string = this.endpoint + 'autenticar';

  private usuarioAutenticado: BehaviorSubject<UsuarioTokenViewModel | undefined>;

  constructor(private http: HttpClient, private LocalStorage: LocalStorageService)
  {
    this.usuarioAutenticado = new BehaviorSubject<
    UsuarioTokenViewModel | undefined>(undefined);
  }

  public obterUsuarioAutenticado(){
    return this.usuarioAutenticado.asObservable();
  }

  public registrar(usuario: RegistrarUsuarioViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistrar, usuario).pipe(
      map(res => res.dados), //mapeia a res completa e retorna só os dados

      tap((dados: TokenViewModel) => this.LocalStorage.salvarDadosLocalUsuario(dados)),// obter o retorno do map e salva no storage

      tap((dados: TokenViewModel) => this.notificarLogin(dados.usuarioToken)),// notifica os componentes que o usuário realizou o login
      
      catchError((err) => this.processarErroHttp(err))
    );
  }

  private notificarLogin(usuario: UsuarioTokenViewModel): void {
    this.usuarioAutenticado.next(usuario);
  }

  public notificarLogout(): void {
    this.usuarioAutenticado.next(undefined);
  }


  public login(usuario: AutenticarUsuarioViewModel): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointLogin, usuario).pipe(
      map(res => res.dados), //mapeia a res completa e retorna só os dados

      tap((dados: TokenViewModel) => this.LocalStorage.salvarDadosLocalUsuario(dados)),// obter o retorno do map e salva no storage
      
      catchError((err) => this.processarErroHttp(err))
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



}