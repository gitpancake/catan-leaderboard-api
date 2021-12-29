import * as GraphQL from '../graphql';

export interface League {
	_id: string;
	name: string;
	games: GraphQL.Game[];
}
