import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { Player } from './types';
import { createDatabaseConnection } from './services/database/connection';
import { FindAllPlayers } from './services/database/players/database';

require('dotenv').config();

const typeDefs = gql`
	type Player @key(fields: "_id") {
		_id: ID!
		playerName: String!
	}

	extend type Query {
		players: [Player]
	}
`;

const resolvers = {
	Query: {
		players: async (): Promise<Player[]> => {
			return await FindAllPlayers();
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
