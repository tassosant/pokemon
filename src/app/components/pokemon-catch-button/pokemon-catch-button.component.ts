import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PokemonCaughtService } from 'src/app/services/pokemon-caught.service';

@Component({
  selector: 'app-pokemon-catch-button',
  templateUrl: './pokemon-catch-button.component.html',
  styleUrls: ['./pokemon-catch-button.component.css']
})
export class PokemonCatchButtonComponent {

  @Input() pokemonName: string="";

  get loading(): boolean{
    return this.pokemonCaughtService.loading;
  }

  constructor(private readonly pokemonCaughtService: PokemonCaughtService){}

  onCatchClick(): void{
    //Add the pokemon to trainer's pack
    // alert(this.pokemonName+' was caught!!');
    this.pokemonCaughtService.addToPack(this.pokemonName)
    .subscribe({
      next:(response:any)=>{
        console.log("NEXT", response);
        
      },
      error:(error:HttpErrorResponse)=>{
        console.log("ERROR", error.message);
        
      }
    })
  }
}
