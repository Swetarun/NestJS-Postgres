import { Field, InputType} from '@nestjs/graphql'

@InputType()
export class inputPokemon{
    @Field() readonly name: string
    @Field() readonly type: string
    @Field() readonly pokedex: number
}