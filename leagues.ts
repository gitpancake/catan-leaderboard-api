import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { League } from './types';
import {
	AddGameToLeague,
	CreateLeague,
	FindAllLeagues,
} from './services/database/leagues';
import { createDatabaseConnection } from './services/database/connection';

require('dotenv').config();

const typeDefs = gql`
	type Score {
		playerName: String!
		victoryPoints: Int!
		cities: Int!
		settlements: Int!
		longestRoads: Int!
		largestArmies: Int!
		devPoints: Int!
	}

	type League @key(fields: "_id") {
		_id: ID!
		name: String!
		games: [Game]
		totalScores: [Score]
	}

	extend type Game @key(fields: "_id") {
		_id: ID! @external
	}

	extend type Query {
		leagues: [League]
	}

	input CreateLeagueInput {
		name: String!
	}

	input LinkLeagueToGameInput {
		leagueId: ID!
		gameId: ID!
	}

	extend type Mutation {
		createLeague(userPayload: CreateLeagueInput): League
	}
`;

const resolvers = {
	League: {
		games(league: League) {
			return league.games.map((_id) => ({
				__typename: 'Game',
				_id,
			}));
		},
	},
	Query: {
		leagues: async (): Promise<League[]> => {
			return await FindAllLeagues();
		},
	},
	Mutation: {
		createLeague: async (_, userPayload): Promise<League> => {
			const { name } = userPayload.userPayload;

			return await CreateLeague(name);
		},
	},
};

createDatabaseConnection();

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4001 }).then(({ url }) => {
	console.log(`🚀 Leagues Service ready at ${url}`);
});
