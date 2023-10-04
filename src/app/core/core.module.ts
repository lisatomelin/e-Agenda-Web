import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, NgbCollapse],
  exports:[NavbarComponent],
})
export class CoreModule { }
