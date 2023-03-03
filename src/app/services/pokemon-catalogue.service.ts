import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { filter, finalize, fromEvent, Observable, of, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.module';
import { PokemonLimitedResponse } from '../models/pokemonLimitedResponse.module';
import { StorageUtil } from '../utils/storage.utils';
import { PokemonImagesService } from './pokemon-images.service';
import { PokemonMapperService } from './pokemon-mapper.service';


const {apiPokemons,imageBaseURL} = environment;
export const first_gen=151;
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService implements OnInit{

  

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

  constructor(
    private readonly http:HttpClient, 
    private readonly pokemonMapperService:PokemonMapperService,
    private readonly pokemonImagesService:PokemonImagesService) { }

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

  public fetchImage(pokemon:Pokemon):string{
    const imageURL = `${imageBaseURL}/${String(pokemon.pokemonId)}.png`;
    // console.log('requested imageURL:', imageURL);
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
      tap((response)=>{
        const reader = new FileReader();
        //     const imageObjectURL=URL.createObjectURL(response.blob());
        reader.readAsDataURL(response);
        reader.onloadend = ()=>{
          let base64data = reader.result;
          pokemon.image = base64data!.toString();
          return pokemon.image;
      }
       })
      // tap(
      //   (response)=>{
          
      //     return imageObjectURL;
      //   }
      // )
    ).subscribe({
      next:(response)=>{
       return pokemon.image
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
    
    return pokemon.image;
    
    
  }

  public findAllImages(pokemons:Pokemon[]){
    // let pokemons = StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!;
    // let pomemonWithImages = pokemons.map<Pokemon>((pokemon:Pokemon,pokemonIndex:number,pokemons:Pokemon[]):any=>{
    //   // this.fetchImage(pokemon,pokemon.pokemonId);
    //   pokemon = this.fetchImage(pokemon);
    // })
    // let pokemonClones = [...pokemons];
    for(let pokemon of pokemons){
      pokemon.image=this.fetchImage(pokemon);
    }
    // console.log("Pokemons in find all images:", pokemons);
   
    
  }

  public findAllPokemon(): void{
    this._loading = true;
    // if(StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!==undefined){
    if(StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!==undefined){
      this._pokemons=StorageUtil.storageRead<Pokemon[]>(StorageKeys.Pokemons)!;
      this._loading=false;
      return;
    }
    this.http.get<PokemonLimitedResponse>(`${apiPokemons}?offset=0&limit=${first_gen}`)
    .pipe(finalize(()=>{
      this._loading = false;
    }),
    tap((pokemons:PokemonLimitedResponse)=>{
      this._pokemons = this.pokemonMapperService.toPokemonWithoutImg(pokemons, this._pokemons);
      console.log("Pokemon before fetching", this._pokemons);
      
      // return this._pokemons;
    })
    ,tap(()=>{
    //  this.findAllImages(this._pokemons);
      // this._pokemons = this.pokemonImagesService.findAllImages(this._pokemons)!;
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

  ngOnInit(): void {
      // this.pokemonImagesService.findAllImages(this._pokemons);
  }
}
