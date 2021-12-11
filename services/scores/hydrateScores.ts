import * as Database from '../../types/database';
import * as GraphQL from '../../types/graphql';
import { PlayerModel } from '../database/models/player';

export const hydrateScores = async (
	scores: Database.Score[],
): Promise<GraphQL.Score[]> => {
	return await Promise.all(
		scores.map(async (score: Database.Score) => {
			const player = await PlayerModel.findById(score.playerId);

			return {
				playerName: player.playerName,
				victoryPoints: score.victoryPoints,
				cities: score.cities,
				settlements: score.settlements,
				longestRoads: score.longestRoads,
				largestArmies: score.largestArmies,
				devPoints: score.devPoints,
			};
		}),
	);
};
