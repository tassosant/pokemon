import { Pokemon } from "./pokemon.module";

export interface Trainer{
    id: number;
    username: string;
    pokemon: Pokemon[];
}

