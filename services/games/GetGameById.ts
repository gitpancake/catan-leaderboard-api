import * as GraphQL from '../../types/graphql';
import * as Database from '../../types/database';
import { GameModel } from '../database/models/game';
import { hydrateGame } from './hydrateGame';

export const GetGameById = async (gameId: string): Promise<GraphQL.Game> => {
	const game: Database.Game = await GameModel.findById(gameId);

	return await hydrateGame(game);
};
