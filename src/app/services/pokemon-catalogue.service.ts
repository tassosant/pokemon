import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.module';
import { PokemonLimitedResponse } from '../models/pokemonLimitedResponse.module';

//this will change to pokemon, I'll leave it like this for now to handle the rest
const {apiPokemons} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemons(): Pokemon[]{
    return this._pokemons;
  }

  get error(): string{
    return this._error;
  }

  get loading(): boolean{
    return this._loading;
  }

  constructor(private readonly http:HttpClient) { }

  public findAllPokemon(): void{
    this._loading = true;
    this.http.get<Pokemon[]>(`${apiPokemons}?offset=0&limit=151`)
    .pipe(finalize(()=>{
      this._loading = false;
    }))
    .subscribe({
      next: (pokemons: Pokemon[])=>{
        this._pokemons = pokemons;
      },
      error:(error: HttpErrorResponse)=>{
        this._error = error.message;
      }
      
    })
  }

  // private toClient(pokemons: PokemonLimitedResponse[]): Pokemon[]{
  //   // return pokemons.map((pokemon)=>{
  //   //   name:,
  //   //   image:
  //   // })
  // }

  private extractId(pokemonsUrl: string): number{
    let pattern = new RegExp("/[0-9]+/",'g');
    let result = pattern.exec(pokemonsUrl);
    let id =0;
    if(result != null || result !=undefined){
      console.log('id of pokemon',result);
      let id = parseInt(result.toString().replace(/,/g,""));
      
    }
    return id;
  }
}
