import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import { ContatosModule } from './views/contatos/contatos.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
    ContatosModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
