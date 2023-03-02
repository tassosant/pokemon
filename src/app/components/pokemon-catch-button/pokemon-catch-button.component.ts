import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PokemonCaughtService } from 'src/app/services/pokemon-caught.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-catch-button',
  templateUrl: './pokemon-catch-button.component.html',
  styleUrls: ['./pokemon-catch-button.component.css']
})
export class PokemonCatchButtonComponent implements OnInit{

  public isCaught: boolean = false;
  @Input() pokemonId!: number;

  get loading(): boolean{
    return this.pokemonCaughtService.loading;
  }

  // get isCaught(): boolean{
  //   return this.trainerService.inPack(this.pokemonName);
  // }
  ngOnInit(): void {
      this.isCaught = this.trainerService.inPack(this.pokemonId);
  }
  constructor(
    private trainerService: TrainerService,
    private readonly pokemonCaughtService: PokemonCaughtService){}

  onCatchClick(): void{
    //Add the pokemon to trainer's pack
    // alert(this.pokemonName+' was caught!!');
    this.pokemonCaughtService.addToPack(this.pokemonId)
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
