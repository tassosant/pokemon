import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.module';
import { Trainer } from 'src/app/models/trainer.module';

@Component({
  selector: 'app-pokemon-trainer',
  templateUrl: './pokemon-trainer.component.html',
  styleUrls: ['./pokemon-trainer.component.css']
})
export class PokemonTrainerComponent {
  @Input() trainer!: Trainer;
  @Input() pokemon!:Pokemon;
}
