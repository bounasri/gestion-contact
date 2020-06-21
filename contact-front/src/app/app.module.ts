import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListUserComponent } from './users/list-user/list-user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { AddUserComponent } from './users/add-user/add-user.component';
import {ButtonModule} from 'primeng/button';
import {
  ConfirmationService,
  ConfirmDialogModule, DropdownModule,
  InputTextModule,
  KeyFilterModule,
  MessageModule,
  MessageService,
  PasswordModule
} from 'primeng/primeng';
import {UserService} from './shared/services/user.service';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {JwtInterceptorService} from './shared/auth/jwt-interceptor.service';
import {tokenReference} from '@angular/compiler';
import { AuthorityDirective } from './shared/directives/authority.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserComponent,
    LoginComponent,
    AuthorityDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    KeyFilterModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  providers: [MessageService, ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
