import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './Guards/auth.guard';
import { DatePipe } from '@angular/common';
import { AuthService } from './Services/auth.service';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NoopAnimationsModule
  ],

  providers: [AuthService,AuthGuard,DatePipe,
    {

        provide : HTTP_INTERCEPTORS,
        useClass : TokenInterceptorService,
        multi:true

    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
