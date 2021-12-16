import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import * as GraphQL from './types/graphql';
import * as Database from './types/database';
import LeagueService from './services/leagues';
import { FileReader } from './services/files/FileReader';
import { createDatabaseConnection } from './services/database/connection';

require('dotenv').config();

const graphQLSchema = new FileReader('./graphql/League.graphql').getFile();
const typeDefs = gql(graphQLSchema);

const _leagueService = new LeagueService();

const resolvers = {
	League: {
		async __resolveReferece(ref: Database.Ref) {
			const league = await _leagueService.GetLeagueById(ref._id);

			return league;
		},
	},
	Query: {
		leagues: async (): Promise<GraphQL.League[]> => {
			const leagues = await _leagueService.GetAllLeagues();

			return await Promise.all(
				leagues.map(
					async (league: Database.League) =>
						await _leagueService.HydrateLeague(league),
				),
			);
		},
	},
	Mutation: {
		createLeague: async (_, userPayload): Promise<GraphQL.League> => {
			const { name } = userPayload.userPayload;

			const newLeague = await _leagueService.CreateLeague(name);

			return await _leagueService.HydrateLeague(newLeague);
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
