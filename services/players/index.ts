import * as Database from '../../types/database';
import * as GraphQL from '../../types/graphql';
import { PlayerModel } from '../database/models/player';

export interface IPlayerService {
	GetAllPlayers(): Promise<Database.Player[]>;
	CreatePlayer(playerName: string): Promise<Database.Player>;
	GetPlayersInGame(gameId: string): Promise<Database.Player[]>;
	GetPlayerById(playerId: string): Promise<Database.Player>;
	GetPlayerByName(playerName: string): Promise<Database.Player[]>;
	HydratePlayer(playerId: string): Promise<GraphQL.Player>;
}

export default class PlayerService implements IPlayerService {
	async GetAllPlayers(): Promise<Database.Player[]> {
		return await PlayerModel.find({});
	}

	async CreatePlayer(playerName: string): Promise<Database.Player> {
		return await new PlayerModel({ playerName })
			.save()
			.then((player) => player)
			.catch((err) => err);
	}

	async GetPlayersInGame(gameId: string): Promise<Database.Player[]> {
		throw new Error('Method not implemented.');
	}

	async GetPlayerById(playerId: string): Promise<Database.Player> {
		return await PlayerModel.findById(playerId);
	}

	async GetPlayerByName(playerName: string): Promise<Database.Player[]> {
		return await PlayerModel.find({ playerName });
	}

	async HydratePlayer(playerId: string): Promise<GraphQL.Player> {
		const player = await this.GetPlayerById(playerId);

		return {
			id: player._id,
			playerName: player.playerName,
		};
	}
}
