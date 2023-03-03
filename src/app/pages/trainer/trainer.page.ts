import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.module';
import { Trainer } from 'src/app/models/trainer.module';
import { PokemonCaughtService } from 'src/app/services/pokemon-caught.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage {
  // @Input() trainer!:Trainer;

  constructor(
    private trainerService:TrainerService,
    
    )
  {}
  
  get trainer():Trainer{
    return this.trainerService.trainer!;
  }

  get pokemons(): Pokemon[] | undefined{
    return this.trainerService.pokemons;
  }
}
