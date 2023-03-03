import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.module';
import { PokemonImage } from '../models/pokemonImage.module';
import { StorageUtil } from '../utils/storage.utils';
import { PokemonMapperService } from './pokemon-mapper.service';


const {imageBaseURL} = environment;

let pokemonImage : PokemonImage ={pokemonId:0,image:""};

@Injectable({
  providedIn: 'root'
})
export class PokemonImagesService {

  
  private _pokemonImages:PokemonImage[] = [];
  private _error: string = "";
  constructor(private readonly http:HttpClient, private readonly pokemonMapperService:PokemonMapperService) { }

  get pokemonImages(): PokemonImage[]{
    return this._pokemonImages;
  }
  get error(): string{
    return this._error;
  }
  public findAllImages(pokemons:Pokemon[], generation:number){
    console.log("in pokemon image service, findAllImges before loop:",pokemons);
    if(pokemons==undefined || pokemons==null ||pokemons.length==0){
        // let pokemonImages:PokemonImage[]
        
        for(let index = 1; index<=generation;index++){
          //copy the id of pokemon
          pokemonImage.pokemonId = index;
          //copy the image url
          this.fetchImage(undefined,pokemonImage);
          
          this._pokemonImages=[...this._pokemonImages,pokemonImage];
        }
        console.log(this._pokemonImages);
        StorageUtil.storageSave(StorageKeys.PokemonImg,this._pokemonImages);
        return;
      }
    for(let pokemon of pokemons){
      this.fetchImage(pokemon,undefined);
    }
    console.log("in pokemon image service, findAllImges:",pokemons);
    StorageUtil.storageSave(StorageKeys.PokemonImg,pokemons);
  }

  public fetchImage(pokemon:Pokemon | undefined,pokemonImage:PokemonImage |undefined){
    let pokemonFixed:Pokemon|PokemonImage;
    if(pokemon===undefined){
        pokemonFixed=pokemonImage!;

      
    }else{
      pokemonFixed=pokemon
    }
    const imageURL = `${imageBaseURL}/${String(pokemonFixed.pokemonId)}.png`;
    this.http.get(String(imageURL),{responseType:"blob"}).pipe(
      tap((response)=>{
        const reader = new FileReader();
        //     const imageObjectURL=URL.createObjectURL(response.blob());
        reader.readAsDataURL(response);
        reader.onloadend = ()=>{
          let base64data = reader.result;
          pokemonFixed.image = base64data!.toString();
          return pokemonFixed.image;
      }
       })).subscribe({
        next:(response)=>{
         return pokemonFixed.image
        },
        error:(error: HttpErrorResponse)=>{
          this._error = error.message;
          console.log(error);
          
        }
        })
       
}
}
