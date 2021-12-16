import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import * as GraphQL from './types/graphql';
import * as Database from './types/database';
import { createDatabaseConnection } from './services/database/connection';
import GameService from './services/games';
import { FileReader } from './services/files/FileReader';

require('dotenv').config();

const graphQlSchema = new FileReader('./graphql/Games.graphql').getFile();
const typeDefs = gql(graphQlSchema);

const _gameService = new GameService();

const resolvers = {
	Game: {
		async __resolveReference(ref: Database.Ref) {
			const game = await _gameService.GetGameById(ref._id);

			return _gameService.hydrateGame(game);
		},
	},
	Query: {
		games: async (): Promise<GraphQL.Game[]> => {
			const games = await _gameService.GetAllGames();

			return await Promise.all(
				games.map(async (game) => _gameService.hydrateGame(game)),
			);
		},
	},
	Mutation: {
		createGame: async (_, userPayload): Promise<GraphQL.Game> => {
			const { date, leagueId, scores } = userPayload.userPayload;
			const newGame = await _gameService.CreateGame(date, leagueId, scores);

			return await _gameService.hydrateGame(newGame);
		},
	},
};

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

createDatabaseConnection();

server.listen({ port: 4002 }).then(({ url }) => {
	console.log(`🚀 Games Service ready at ${url}`);
});
