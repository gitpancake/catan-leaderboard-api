import * as Database from '../../types/database';
import * as GraphQL from '../../types/graphql';
import { hydrateLeague } from '../leagues/hydrateLeague';
import { LeagueModel } from '../database/models/league';

export const FindAllLeagues = async (): Promise<GraphQL.League[]> => {
	const leagues: Database.League[] = await LeagueModel.find({});

	return await Promise.all(
		leagues.map(async (league: Database.League) => await hydrateLeague(league)),
	);
};
