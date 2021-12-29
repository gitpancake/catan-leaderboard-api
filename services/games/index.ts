import * as Database from '../../types/database';
import * as GraphQL from '../../types/graphql';
import ScoreService, { IScoreService } from '../scores';
import { GameModel } from '../database/models/game';

export interface IGameService {
	CreateGame(
		date: string,
		leagueId: string,
		scores: Database.Score[],
	): Promise<Database.Game>;

	GetAllGames(): Promise<Database.Game[]>;

	GetGameById(gameId: string): Promise<Database.Game>;

	GetGamesForLeague(leagueId: string): Promise<Database.Game[]>;

	hydrateGame(game: Database.Game): Promise<GraphQL.Game>;
}

export default class GameService implements IGameService {
	private _scoreService: IScoreService;

	constructor() {
		this._scoreService = new ScoreService();
	}

	async GetGamesForLeague(leagueId: string): Promise<Database.Game[]> {
		const games = await GameModel.find({ leagueId });

		return games;
	}

	async CreateGame(
		date: string,
		leagueId: string,
		scores: Database.Score[],
	): Promise<Database.Game> {
		return new GameModel({
			date,
			leagueId,
		})
			.save()
			.then(async (game) => {
				await this._scoreService.CreateScores(scores);

				return game;
			})
			.catch((err) => err);
	}

	async GetAllGames(): Promise<Database.Game[]> {
		const games = await GameModel.find({});

		return games;
	}

	async GetGameById(gameId: string): Promise<Database.Game> {
		return await GameModel.findById(gameId);
	}

	async GetScoresForGame(gameId: string): Promise<Database.Score[]> {
		const game: Database.Game = await this.GetGameById(gameId);

		if (!game) {
			throw new Error(
				`Fatal - Game ${game} not found while retrieving scores for ${gameId}`,
			);
		}

		const gameScores: Database.Score[] =
			await this._scoreService.GetScoresByGameId(game._id);

		return gameScores;
	}

	async hydrateGame(game: Database.Game): Promise<GraphQL.Game> {
		const linkedScores = await this._scoreService.GetScoresByGameId(game._id);
		const hydratedScores = await Promise.all(
			linkedScores.map(
				async (score) => await this._scoreService.HydrateScore(score),
			),
		);

		const { date, _id } = game;

		return {
			_id,
			date,
			scores: hydratedScores,
		};
	}
}
