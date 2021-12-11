import * as GraphQL from '../graphql';

export interface League {
	id: string;
	name: string;
	games: GraphQL.Game[];
}
