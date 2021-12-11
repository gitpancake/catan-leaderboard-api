import { Player } from '../../../types';
import { PlayerModel } from '../models/player';

export const FindAllPlayers = async (): Promise<Player[]> => {
	return await PlayerModel.find({});
};

export const FindPlayerById = async (_id: string) => {
	return await PlayerModel.findById(_id);
};
