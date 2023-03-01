import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPage } from "./landing/landing.page";
import { LoginPage } from "./login/login.page";
import { PokemonCataloguePage } from "./pokemon-catalogue/pokemon-catalogue.page";
import { TrainerPage } from "./trainer/trainer.page";

const routes: Routes = [
    {
        path:"",
        pathMatch:"full",
        redirectTo:"/login"
    },
    {
        path:"login",
        component: LandingPage
    },
    {
        path: "pokemons",
        component: PokemonCataloguePage
    },
    {
        path: "profile",
        component: TrainerPage
    }
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ], //import a module
    exports:[
        RouterModule
    ]  //expose module and its feeatures
})

export class AppRoutingModule{

}