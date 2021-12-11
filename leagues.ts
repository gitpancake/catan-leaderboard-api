import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import * as GraphQL from './types/graphql';
import { FindAllLeagues, CreateLeague } from './services/leagues';
import { FileReader } from './services/files/FileReader';
import { createDatabaseConnection } from './services/database/connection';

require('dotenv').config();

const graphQLSchema = new FileReader('./graphql/League.graphql').getFile();
const typeDefs = gql(graphQLSchema);

const resolvers = {
	Query: {
		leagues: async (): Promise<GraphQL.League[]> => {
			return await FindAllLeagues();
		},
	},
	Mutation: {
		createLeague: async (_, userPayload): Promise<GraphQL.League> => {
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
