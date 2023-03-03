import { Component, OnInit } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon.module';
import { first_gen, PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { PokemonImagesService } from 'src/app/services/pokemon-images.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit{

    get pokemons():Pokemon[]{
      return this.pokemonCatalogueService.pokemons;
    }

    get loading(): boolean{
      return this.pokemonCatalogueService.loading;
    }

    get error(): string{
      return this.pokemonCatalogueService.error;
    }

    constructor(
      private readonly pokemonCatalogueService: PokemonCatalogueService,
      private readonly pokemonImagesService:PokemonImagesService
    ){}

    ngOnInit(): void {
        this.pokemonCatalogueService.findAllPokemon();
        // this.pokemonImagesService.findAllImages (this.pokemonCatalogueService.pokemons, first_gen);
    }

}
