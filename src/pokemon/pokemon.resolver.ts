import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { inputPokemon } from "./input/pokemon.input";
import { PokemonEntity } from "./pokemon.entity";
import { PokemonService } from "./pokemon.service";

@Resolver((of) => PokemonEntity)
export class PokemonResolver {
    constructor (private readonly pokemonService: PokemonService) {}

    @Query(() => [CreatePokemonDto])
    async pokemon() {
        return this.pokemonService.getPokemon()
    }

    @Mutation(() => CreatePokemonDto)
    async createPokemon (@Args('data') data: inputPokemon) {
        return this.pokemonService.createPokemon(data)
    }
}