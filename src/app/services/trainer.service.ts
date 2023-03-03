import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.module';
import { Trainer } from '../models/trainer.module';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
//this user service will keep track of the current loggedin trainer
export class TrainerService {
  // private _trainer: Trainer | undefined; OR
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }
  
  get pokemons():Pokemon[] | undefined{
    return this._trainer?.pokemon;
  }

  set trainer(trainer:Trainer | undefined){
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
    
  }

  public inPack(pokeId: number): boolean{
    if(this._trainer){
      
      
      // console.log(Boolean(this._trainer?.pokemon.find((pokemon:Pokemon)=> {pokemon.pokemonId===pokemonId})));
      // console.log("trainerAPI pokemonId", typeof this._trainer.pokemon);
      // if(this._trainer?.pokemon[pokemonId]!==undefined)
      //   return Boolean(this._trainer?.pokemon[pokemonId].pokemonId===pokemonId);
      // console.log(this._trainer?.pokemon[pokemonId].pokemonId===pokemonId);
      // console.log(this._trainer.pokemon);
      // return Boolean(this._trainer.pokemon.find((pokemon:Pokemon)=> {pokemon["pokemonId"] === pokeId}) );
      // good old loop
      for(const pokemon of this._trainer.pokemon){
        if(pokemon.pokemonId===pokeId)
          return true;
      }
    }
    return false;
  }
  public addToCaught(pokemon:Pokemon):void{
    if(this._trainer){
      this._trainer.pokemon.push(pokemon);
    }
  }
  public removeFromCaught(pokemonId:number):void{
    if(this._trainer){
      this._trainer.pokemon= this._trainer.pokemon.filter((pokemon:Pokemon)=>pokemon.pokemonId!==pokemonId);
    }
  }
}
