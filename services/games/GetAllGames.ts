import { Game } from '../../types';
import * as GraphQL from '../../types/graphql';
import { GameModel } from '../database/models/game';
import { hydrateGame } from './hydrateGame';

export const GetAllGames = async (): Promise<GraphQL.Game[]> => {
	const games = await GameModel.find({});

	const graphQlGames = await Promise.all(
		games.map(async (game: Game) => await hydrateGame(game)),
	);

	return graphQlGames;
};
