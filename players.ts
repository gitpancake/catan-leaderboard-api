import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { FileReader } from './services/files/FileReader';

import * as Database from './types/database';
import * as GraphQL from './types/graphql';

import PlayerService from './services/players';

import { createDatabaseConnection } from './services/database/connection';

require('dotenv').config();

const graphQLSchema = new FileReader('./graphql/Player.graphql').getFile();
const typeDefs = gql(graphQLSchema);

const _playerService = new PlayerService();

const resolvers = {
	Player: {
		async __resolveReference(ref: Database.Ref) {
			return _playerService.HydratePlayer(ref._id);
		},
	},
	Query: {
		players: async (): Promise<GraphQL.Player[]> => {
			const players: Database.Player[] = await _playerService.GetAllPlayers();
			return await Promise.all(
				players.map(
					async (player: Database.Player) =>
						await _playerService.HydratePlayer(player._id),
				),
			);
		},
	},
	Mutation: {
		createPlayer: async (_, userPayload): Promise<GraphQL.Player> => {
			const { playerName } = userPayload.userPayload;

			const newPlayer = await _playerService.CreatePlayer(playerName);

			return await _playerService.HydratePlayer(newPlayer._id);
		},
	},
};

createDatabaseConnection();

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4003 }).then(({ url }) => {
	console.log(`🚀 Players Service ready at ${url}`);
});
