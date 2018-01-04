
import { ReactiveFormsModule } from '@angular/forms';
import { AppRotas } from './app-rotas';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthService } from './component/service/auth.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRotas,
    HttpClientModule
  ],
  providers: [AuthService], // service para http
  bootstrap: [AppComponent]
})
export class AppModule { }
