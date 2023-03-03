import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, finalize, fromEvent, Observable, of, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.module';
import { PokemonLimitedResponse } from '../models/pokemonLimitedResponse.module';
import { StorageUtil } from '../utils/storage.utils';
import { PokemonMapperService } from './pokemon-mapper.service';


const {apiPokemons,imageBaseURL} = environment;

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

  public fetchImage(pokemon:Pokemon):void{
    const imageURL = `${imageBaseURL}/${String(pokemon.pokemonId)}.png`;
    console.log('requested imageURL:', imageURL);
    this.http.get(String(imageURL),{responseType:"blob"}).pipe(
      // finalize(()=>{
       
      // }),tap(
      //   (response:Response)=>{
      //     return response.blob();
      //   }
      // ),
      // tap(response=>{
      //   const reader = new FileReader();
      //   reader.readAsDataURL(response);
       
      // return {reader};
      // }),
      // tap((data: FileReader)=>{
      //     data.onloadend = ()=>{
      //     let base64data = data.result;
      //     pokemon.image = base64data!.toString();
      // }
      //  })
      // tap(
      //   (response)=>{
          
      //     const imageObjectURL=URL.createObjectURL(response.blob());
      //     return imageObjectURL;
      //   }
      // )
    ).subscribe({
      next:(response)=>{
       
      // console.log("RESPONSE!!!!",response);
      //const imageBlob = response.blob();
      
      
      // reader.onloadend = ()=>{
      //   let base64data = reader.result;
      //   pokemon.image = base64data!.toString();
        
        
      // };
    },
    error:(error: HttpErrorResponse)=>{
      this._error = error.message;
      console.log(error);
      
    }
    })
  }

  private findAllImages(pokemons:Pokemon[]): Pokemon[] {
    // let pokemons = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!;
    pokemons.map((pokemon:Pokemon,pokemonIndex:number,pokemons:Pokemon[])=>{
      // this.fetchImage(pokemon,pokemon.pokemonId);
      this.fetchImage(pokemon);
    })
    return pokemons;
  }

  public findAllPokemon(): void{
    this._loading = true;
    // if(StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!==undefined){
    if(StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!==undefined){
      this._pokemons=StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!;
      this._loading=false;
      return;
    }
    this.http.get<PokemonLimitedResponse>(`${apiPokemons}?offset=0&limit=151`)
    .pipe(finalize(()=>{
      this._loading = false;
    }),
    tap((pokemons:PokemonLimitedResponse)=>{
      this._pokemons = this.pokemonMapperService.toPokemonWithoutImg(pokemons);
      console.log("Pokemon before fetching", this._pokemons);
      
      // return this._pokemons;
    })
    ,tap(()=>{
      // this._pokemons = this.findAllImages(this._pokemons);
      
    })
    ,tap(()=>{
      // this._pokemons = this.pokemonMapperService.toPokemonWithImg(this._pokemons, this.findAllImages(this._pokemons));
      console.log("pokemon after mapping with img",this._pokemons);
      
      // StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemons,this._pokemons);
      
    })
    ,tap(()=>{
      // this._pokemons = this.pokemonMapperService.toPokemonWithImg(this._pokemons, this.findAllImages(this._pokemons));
      StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemons,this._pokemons);
      
    })
    )
    .subscribe({
      next: (pokemons: PokemonLimitedResponse)=>{
        // this._pokemons = this.pokemonMapperService.toPokemonWithoutImg(pokemons);
        console.log("Pokemons, after fetching image", this._pokemons);
        
        // StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemons,this._pokemons);
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
