import * as Database from '../../types/database';
import { PlayerModel } from '../database/models/player';

export interface IPlayerService {
	FindPlayerById(playerId: string): Promise<Database.Player>;
	FindPlayerByName(playerName: string): Promise<Database.Player[]>;
}

export class PlayerService implements IPlayerService {
	async FindPlayerById(playerId: string): Promise<Database.Player> {
		return await PlayerModel.findById(playerId);
	}

	async FindPlayerByName(playerName: string): Promise<Database.Player[]> {
		return await PlayerModel.find({ playerName });
	}
}
