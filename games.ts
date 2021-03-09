import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { Game, Ref } from './types';
import { createDatabaseConnection } from './services/database/connection';

import {
	CreateGame,
	GetAllGames,
	GetGameById,
} from './services/database/games';

require('dotenv').config();

const typeDefs = gql`
	type Game @key(fields: "_id") {
		_id: ID!
		date: String!
		scores: [Score]
	}

	type Score {
		playerName: String!
		victoryPoints: Int!
		cities: Int!
		settlements: Int!
		longestRoads: Int!
		largestArmies: Int!
		devPoints: Int!
	}

	extend type Query {
		games: [Game]
	}

	input ScoreInput {
		playerName: String!
		victoryPoints: Int
		cities: Int
		settlements: Int
		longestRoads: Int
		largestArmies: Int
		devPoints: Int
	}

	input CreateGameInput {
		date: String!
		leagueId: String!
		scores: [ScoreInput]
	}

	extend type Mutation {
		createGame(userPayload: CreateGameInput): Game
	}
`;

const resolvers = {
	Game: {
		__resolveReference(ref: Ref) {
			return GetGameById(ref._id);
		},
	},
	Query: {
		games: async (): Promise<Game[]> => {
			return await GetAllGames();
		},
	},
	Mutation: {
		createGame: async (_, userPayload): Promise<Game> => {
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
