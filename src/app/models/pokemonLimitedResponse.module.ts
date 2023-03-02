export interface PokemonLimitedResponse{
    count: number;
    next: string;
    name: string;
    previous:string;
    results:results[];
    // {"count":1279,"next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20","previous":null,"results":
    urlPokemonId: string;
}

interface results{
    name: string;
    url:string;
}