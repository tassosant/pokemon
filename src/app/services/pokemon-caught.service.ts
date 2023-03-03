import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.module';
import { Trainer } from '../models/trainer.module';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiTrainers} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCaughtService {

  private _loading: boolean = false;

  get loading(): boolean{
    return this._loading;
  }

  constructor(
    private http:HttpClient,
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
  ) { }
  //get the pokemon based on name

  //patch request to our server with the userid and the pokemon


  public addToPack(pokemonId: number): Observable<Trainer>{
    if(!this.trainerService.trainer){
      throw new Error("There is no trainer")
    }
    const trainer: Trainer = this.trainerService.trainer;
    const pokemon:Pokemon | undefined = this.pokemonCatalogueService.findPokemonById(pokemonId);
    if(!pokemon){
      throw new Error("No pokemon with id: "+pokemonId+" found!!");
    }
    

    const headers= new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true;
    
    if(this.trainerService.inPack(pokemonId)){
      this.trainerService.removeFromCaught(pokemonId);
    }else{
      //found the impostor
      this.trainerService.addToCaught(pokemon);
    }
    
    // const hasPokemon: Pokemon | undefined = user
    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`,{
      pokemon:[...trainer.pokemon]
    },{
      headers
    })
    .pipe(
      tap((updatedTrainer:Trainer)=>{
        this.trainerService.trainer = updatedTrainer;
      }),
      finalize(()=>{
        this._loading=false;
      })
    )
  }
}