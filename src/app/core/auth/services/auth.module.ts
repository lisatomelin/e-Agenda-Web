import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],

  providers: [AuthService, LocalStorageService],
})
export class AuthModule { }
