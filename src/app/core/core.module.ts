import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/services/auth.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, NgbCollapse, AuthModule],
  exports:[NavbarComponent, AuthModule],
})
export class CoreModule { }
