import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.module';
import { PokemonLimitedResponse } from '../models/pokemonLimitedResponse.module';

@Injectable({
  providedIn: 'root'
})
export class PokemonMapperService {
  toPokemonWithoutImg(pokemons: PokemonLimitedResponse): Pokemon[]{
    return pokemons.results.map((pokemon)=>({
      pokemonId: this.extractId(pokemon.url),
      name: pokemon.name,
      image: ""
    }));
  }
  
  private extractId(pokemonUrl: string) : number{
    let pattern = new RegExp("/[0-9]+/",'g');
    let result = pattern.exec(pokemonUrl);
    let id = 0;
    if(result != null || result !=undefined){
      id = parseInt(result.toString().replace(/\//g,""));
    }
    return id;
  }

  // injectImageUrl(pokemons:Pokemon[]): Pokemon[]{
  //   return pokemons.map((pokemon)=>({

  //   }))
  // }
}
