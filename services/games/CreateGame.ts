import * as GraphQL from '../../types/graphql';
import * as Database from '../../types/database';
import { GameModel } from '../database/models/game';
import { ScoreModel } from '../database/models/score';
import { hydrateGame } from './hydrateGame';

export const CreateGame = async (
	date: string,
	leagueId: string,
	scores: Database.Score[],
): Promise<GraphQL.Game> => {
	return new GameModel({
		date,
		leagueId,
	})
		.save()
		.then((game) => {
			const scoresWithGameId = scores.map((score) => ({
				...score,
				gameId: game._id,
			}));

			ScoreModel.insertMany(scoresWithGameId)
				.then(() => hydrateGame(game))
				.catch((err) => err);
		})
		.catch((err) => err);
};
