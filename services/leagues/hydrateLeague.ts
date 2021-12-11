import * as Database from '../../types/database';
import * as GraphQL from '../../types/graphql';
import { GameModel } from '../database/models/game';
import { hydrateGame } from '../games/hydrateGame';

export const hydrateLeague = async (
	league: Database.League,
): Promise<GraphQL.League> => {
	const games = await GameModel.find({ leagueId: league._id });

	const hydratedGames: GraphQL.Game[] = await Promise.all(
		games.map(async (game: Database.Game) => await hydrateGame(game)),
	);

	return {
		id: league._id,
		name: league.name,
		games: hydratedGames,
	};
};
