import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { PokemonModule } from './pokemon/pokemon.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'postgres',
      password: 'Swetarun@123',
      database: 'linkedin',
      autoLoadEntities: true,
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl'
    }),
    PokemonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
