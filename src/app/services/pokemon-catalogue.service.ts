import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, finalize, fromEvent, Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.module';
import { PokemonLimitedResponse } from '../models/pokemonLimitedResponse.module';
import { StorageUtil } from '../utils/storage.utils';
import { PokemonMapperService } from './pokemon-mapper.service';


const {apiPokemons} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  

  private _pokemons:Pokemon[] =[];
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

  constructor(private readonly http:HttpClient, private readonly pokemonMapperService:PokemonMapperService) { }

  // public findAllPokemon(): void{
  //   // this._loading = true;
  //   // this.http.get<PokemonLimitedResponse>(`${apiPokemons}?offset=0&limit=151`)
  //   // .pipe(finalize(()=>{
  //   //   this._loading = false;
  //   // }))
  //   // .subscribe({
  //   //   next: (pokemons: PokemonLimitedResponse)=>{
  //   //     this._pokemons = this.pokemonMapperService.toPokemonWithoutImg(pokemons);
        
  //   //   },
  //   //   error:(error: HttpErrorResponse)=>{
  //   //     this._error = error.message;
  //   //   }
      
  //   // })
  //   // this._pokemons = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!;
  //   // return this._pokemons = of(StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!).pipe(StorageUtil.storageRead<Pokemon>);
  //   fromEvent<StorageEvent>(window,"storage").pipe(
  //     filter(event=>event.storageArea===sessionStorage),
  //     filter(event=>event.key===StorageKeys.Pokemons),
  //     map(event=>event.newValue)
  //   ).subscribe({
  //     next:()=>{
  //       console.log("mpika");
        
  //     this._pokemons=of(StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!);
  //   }

  //   })
  // }

  // public getAllPokemon(): void{
  //   this._loading = true;
  //   this.http.get<PokemonLimitedResponse>(`${apiPokemons}?offset=0&limit=151`)
  //   .pipe(finalize(()=>{
  //     this._loading = false;
  //   }))
  //   .subscribe({
  //     next: (pokemons: PokemonLimitedResponse)=>{
  //       StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemons,this.pokemonMapperService.toPokemonWithoutImg(pokemons));
  //     },
  //     error:(error: HttpErrorResponse)=>{
  //       this._error = error.message;
  //     }
      
  //   })
  // }

  public findAllPokemon(): void{
    this._loading = true;
    this.http.get<PokemonLimitedResponse>(`${apiPokemons}?offset=0&limit=151`)
    .pipe(finalize(()=>{
      this._loading = false;
    }))
    .subscribe({
      next: (pokemons: PokemonLimitedResponse)=>{
        this._pokemons = this.pokemonMapperService.toPokemonWithoutImg(pokemons);
        
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

  // private extractId(pokemonsUrl: string): number{
  //   let pattern = new RegExp("/[0-9]+/",'g');
  //   let result = pattern.exec(pokemonsUrl);
  //   let id =0;
  //   if(result != null || result !=undefined){
  //     console.log('id of pokemon',result);
  //     let id = parseInt(result.toString().replace(/,/g,""));
      
  //   }
  //   return id;
  // }

  public findPokemonById(pokemonId:number): Pokemon |undefined{
    return this._pokemons.find((pokemon: Pokemon)=>pokemon.pokemonId===pokemonId);
  }

  
}
