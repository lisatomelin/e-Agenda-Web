import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { Inject } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";

export const httpTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
  ) => {
    const token = Inject(LocalStorageService).obterDadosLocaisSalvos()?.chave;    
  
    const requestModificada = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(requestModificada);
};