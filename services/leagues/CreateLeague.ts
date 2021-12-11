import * as GraphQL from '../../types/graphql';
import { LeagueModel } from '../database/models/league';
import { hydrateLeague } from './hydrateLeague';

export const CreateLeague = async (name: string): Promise<GraphQL.League> =>
	await new LeagueModel({ name })
		.save()
		.then((league) => hydrateLeague(league))
		.catch((err) => err);
