import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Trainer } from 'src/app/models/trainer.module';
import { LoginService } from 'src/app/services/login.service';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{
  
  //emit events to the parent component, that is hosting the login form. So the login form is currently embedded in landing page which landing page will receive that event notification
  @Output() login:EventEmitter<void> = new EventEmitter();
  //Dependency Injection
  constructor(
    private readonly trainerService: TrainerService,
    private readonly loginService:LoginService,
    private readonly pokemonCatalogueService:PokemonCatalogueService
    ){ }
  
  loginSubmit(loginForm: NgForm): void{
    
    //username
    const {username} = loginForm.value;
    

    this.loginService.login(username)
    
    .subscribe({
      //Once it will receive the data it will come to the next property
      next:(trainer: Trainer)=>{
        // this.pokemonCatalogueService.getAllPokemon();
        this.trainerService.trainer = trainer;

        
        
        this.login.emit();
        
      },
      
      //if sth goes wrong, it will go to the error property
      error:()=>{
        //handle that locally in the component
      }
    })
  }
}
