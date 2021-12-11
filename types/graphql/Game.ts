import * as GraphQL from '../graphql';

export interface Game {
	date: string;
	scores: GraphQL.Score[];
}
