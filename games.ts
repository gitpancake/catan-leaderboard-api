import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { Ref } from './types';
import * as GraphQL from './types/graphql';
import { createDatabaseConnection } from './services/database/connection';
import { CreateGame, GetGameById, GetAllGames } from './services/games';
import { FileReader } from './services/files/FileReader';

require('dotenv').config();

const graphQlSchema = new FileReader('./graphql/Games.graphql').getFile();
const typeDefs = gql(graphQlSchema);

const resolvers = {
	Game: {
		__resolveReference(ref: Ref) {
			return GetGameById(ref._id);
		},
	},
	Query: {
		games: async (): Promise<GraphQL.Game[]> => {
			return await GetAllGames();
		},
	},
	Mutation: {
		createGame: async (_, userPayload): Promise<GraphQL.Game> => {
			const { date, leagueId, scores } = userPayload.userPayload;
			return await CreateGame(date, leagueId, scores);
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
