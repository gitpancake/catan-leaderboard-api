import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import * as GraphQL from './types/graphql';
import * as Database from './types/database';
import { createDatabaseConnection } from './services/database/connection';
import ScoreService from './services/scores';
import { FileReader } from './services/files/FileReader';

require('dotenv').config();

const graphQlSchema = new FileReader('./graphql/Scores.graphql').getFile();
const typeDefs = gql(graphQlSchema);

const _scoreService = new ScoreService();

const resolvers = {
	Score: {
		async __resolveReference(ref: Database.Ref) {
			const score = await _scoreService.GetScoreById(ref._id);

			return _scoreService.HydrateScore(score);
		},
	},
	Query: {
		scoresForGame: async (_, userPayload): Promise<GraphQL.Score[]> => {
			const { gameId } = userPayload;

			const scores = await _scoreService.GetScoresForGame(gameId);

			return await Promise.all(
				scores.map(
					async (score: Database.Score) =>
						await _scoreService.HydrateScore(score),
				),
			);
		},
	},
};

const server = new ApolloServer({
	schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

createDatabaseConnection();

server.listen({ port: 4005 }).then(({ url }) => {
	console.log(`🚀 Scores Service ready at ${url}`);
});
