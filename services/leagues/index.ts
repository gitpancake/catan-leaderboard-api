import * as GraphQL from '../../types/graphql';
import * as Database from '../../types/database';
import { LeagueModel } from '../database/models/league';
import GameService, { IGameService } from '../games';

interface ILeagueService {
	GetLeagueById(leagueId: string): Promise<Database.League>;
	GetAllLeagues(): Promise<Database.League[]>;
	CreateLeague(name: string): Promise<Database.League>;
	HydrateLeague(league: Database.League): Promise<GraphQL.League>;
}

export default class LeagueService implements ILeagueService {
	private _gameService: IGameService;

	constructor() {
		this._gameService = new GameService();
	}
	async GetAllLeagues(): Promise<Database.League[]> {
		return await LeagueModel.find({});
	}

	async GetLeagueById(leagueId: string): Promise<Database.League> {
		return await LeagueModel.findById(leagueId);
	}

	async CreateLeague(name: string): Promise<Database.League> {
		return await new LeagueModel({ name })
			.save()
			.then((league) => league)
			.catch((err) => err);
	}

	async HydrateLeague({
		_id: leagueId,
		name: leagueName,
	}: Database.League): Promise<GraphQL.League> {
		const games = await this._gameService.GetGamesForLeague(leagueId);
		const hydratedGames = await Promise.all(
			games.map(
				async (game: Database.Game) =>
					await this._gameService.hydrateGame(game),
			),
		);

		return {
			id: leagueId,
			name: leagueName,
			games: hydratedGames,
		};
	}
}
