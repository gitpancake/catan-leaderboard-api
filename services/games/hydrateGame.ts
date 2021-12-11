import * as GraphQL from '../../types/graphql';
import * as Database from '../../types/database';
import { ScoreModel } from '../database/models/score';
import { hydrateScores } from '../scores/hydrateScores';

export const hydrateGame = async (
	game: Database.Game,
): Promise<GraphQL.Game> => {
	const linkedScores = await ScoreModel.find({ gameId: game._id });
	const hydratedScores = await hydrateScores(linkedScores);

	const { date } = game;

	return {
		date,
		scores: hydratedScores,
	};
};
