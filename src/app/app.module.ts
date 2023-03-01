import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './pages/app-routing.module';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LandingPage } from './pages/landing/landing.page';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [ //Components
    AppComponent,
    
    PokemonCataloguePage,
    TrainerPage,
    LandingPage,
    LoginFormComponent
  ],
  imports: [ //modules
    BrowserModule,
    AppRoutingModule,
    LoginFormComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
