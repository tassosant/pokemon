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
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';


import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonCatchButtonComponent } from './components/pokemon-catch-button/pokemon-catch-button.component';

@NgModule({
  declarations: [ //Components
    AppComponent,
    LoginFormComponent,
    PokemonCataloguePage,
    TrainerPage,
    LandingPage,
    
    
    PokemonListComponent,
              PokemonListItemComponent,
              NavbarComponent,
              PokemonCatchButtonComponent,
    
  ],
  imports: [ //modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
