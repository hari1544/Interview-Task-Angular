import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserserviceService } from './service/userservice.service';
import { DataserviceService } from './service/dataservice.service';
import { AuthRoutingModule } from './approuting.module';
import { ApiService } from './service/api.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AuthRoutingModule),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    UserserviceService,
    DataserviceService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
