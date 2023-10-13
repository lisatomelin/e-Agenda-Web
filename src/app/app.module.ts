import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from "@angular/common/http";
import { ListarCategoriasComponent } from './views/categorias/listar-categorias/listar-categorias.component';
import { InserirCategoriaComponent } from './views/categorias/inserir-categoria/inserir-categoria.component';
import { ExcluirCategoriaComponent } from './views/categorias/excluir-categoria/excluir-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
       
        
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,

    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:"toast-top-center",
      preventDuplicates: true,
    }),

    HttpClientModule,
    CoreModule,
    DashboardModule,    
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
