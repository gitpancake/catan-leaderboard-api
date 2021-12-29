import * as GraphQL from '../graphql';

export interface Game {
	_id: string;
	date: string;
	scores: GraphQL.Score[];
}
