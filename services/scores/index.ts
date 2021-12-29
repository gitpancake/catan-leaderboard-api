import * as GraphQL from '../../types/graphql';
import * as Database from '../../types/database';
import PlayerService, { IPlayerService } from '../players';
import GameService, { IGameService } from '../games';
import { ScoreModel } from '../database/models/score';

export interface IScoreService {
	CreateScores(score: Database.Score[]): Promise<Database.Score[]>;
	GetScoresForPlayer(playerId: string): Promise<Database.Score[]>;
	GetScoresByGameId(gameId: string): Promise<Database.Score[]>;
	GetScoreById(scoreId: string): Promise<Database.Score>;
	HydrateScore(
		score: Database.Score,
		player?: Database.Player,
	): Promise<GraphQL.Score>;
}

export default class ScoreService implements IScoreService {
	private _playerService: IPlayerService;
	constructor() {
		this._playerService = new PlayerService();
	}
	async GetScoresByGameId(gameId: string): Promise<Database.Score[]> {
		return await ScoreModel.find({ gameId });
	}

	async GetScoreById(scoreId: string): Promise<Database.Score> {
		return await ScoreModel.findById(scoreId);
	}

	async CreateScores(score: Database.Score[]): Promise<Database.Score[]> {
		return await ScoreModel.insertMany(score);
	}

	async GetScoresForPlayer(playerId: string): Promise<Database.Score[]> {
		const player: Database.Player = await this._playerService.GetPlayerById(
			playerId,
		);

		if (!player) {
			throw new Error(
				`Fatal - Player ${player} not found while retrieving scores for ${playerId}`,
			);
		}

		return await ScoreModel.find({ playerId });
	}

	async HydrateScore(
		score: Database.Score,
		player?: Database.Player,
	): Promise<GraphQL.Score> {
		if (!player) {
			player = await this._playerService.GetPlayerById(score.playerId);
		}

		const { playerName } = player;
		const {
			_id,
			victoryPoints,
			cities,
			settlements,
			longestRoads,
			largestArmies,
			devPoints,
		} = score;

		return {
			_id,
			playerName,
			victoryPoints,
			cities,
			settlements,
			longestRoads,
			largestArmies,
			devPoints,
		};
	}
}
