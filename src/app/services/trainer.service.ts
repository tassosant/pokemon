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
  
  set trainer(trainer:Trainer | undefined){
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() { 
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
    
  }

  public inPack(pokemonName: string): boolean{
    if(this._trainer){

      return Boolean(this.trainer?.pokemon.find((pokemon:Pokemon)=> {pokemon.name===pokemonName}));
    }
    return false;
  }
}
