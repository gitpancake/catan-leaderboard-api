import * as GraphQL from '../../types/graphql';
import * as Database from '../../types/database';
import { IPlayerService, PlayerService } from '../players';
import GameService, { IGameService } from '../games';
import { ScoreModel } from '../database/models/score';

export interface IScoreService {
	CreateScores(score: Database.Score[]): Promise<Database.Score[]>;
	GetScoresForPlayer(playerId: string): Promise<Database.Score[]>;
	GetScoresForGame(gameId: string): Promise<Database.Score[]>;
	GetScoreById(scoreId: string): Promise<Database.Score>;
	HydrateScore(
		score: Database.Score,
		player?: GraphQL.Player,
	): Promise<GraphQL.Score>;
}

export default class ScoreService implements IScoreService {
	private _playerService: IPlayerService;
	private _gameService: IGameService;

	constructor() {
		this._playerService = new PlayerService();
		this._gameService = new GameService();
	}

	async GetScoreById(scoreId: string): Promise<Database.Score> {
		return await ScoreModel.findById(scoreId);
	}

	async CreateScores(score: Database.Score[]): Promise<Database.Score[]> {
		return await ScoreModel.insertMany(score);
	}

	async GetScoresForPlayer(playerId: string): Promise<Database.Score[]> {
		const player: GraphQL.Player = await this._playerService.FindPlayerById(
			playerId,
		);

		if (!player) {
			throw new Error(
				`Fatal - Player ${player} not found while retrieving scores for ${playerId}`,
			);
		}

		return await ScoreModel.find({ playerId });
	}

	async GetScoresForGame(gameId: string): Promise<Database.Score[]> {
		const game: Database.Game = await this._gameService.GetGameById(gameId);

		if (!game) {
			throw new Error(
				`Fatal - Game ${game} not found while retrieving scores for ${gameId}`,
			);
		}

		const gameScores: Database.Score[] = await ScoreModel.find({ gameId });

		return gameScores;
	}

	async HydrateScore(
		score: Database.Score,
		player?: GraphQL.Player,
	): Promise<GraphQL.Score> {
		if (!player) {
			player = await this._playerService.FindPlayerById(score.playerId);
		}

		return {
			playerName: player.playerName,
			victoryPoints: score.victoryPoints,
			cities: score.cities,
			settlements: score.settlements,
			longestRoads: score.longestRoads,
			largestArmies: score.largestArmies,
			devPoints: score.devPoints,
		};
	}
}
