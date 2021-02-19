import { Player } from '../../../types';
import { PlayerModel } from '../models/player';

export const FindAllPlayers = async (): Promise<Player[]> => {
	return await PlayerModel.find({});
};

export const FindPlayerById = async (_id: string) => {
	return await PlayerModel.findById(_id);
};

// export const InsertManyPlayers = async () => {
// 	const playeeers = [
// 		{
// 			playerName: 'Michael',
// 		},
// 		{
// 			playerName: 'Fred',
// 		},
// 		{
// 			playerName: 'Madeleine',
// 		},
// 		{
// 			playerName: 'Henry',
// 		},
// 		{
// 			playerName: 'Diane',
// 		},
// 		{
// 			playerName: 'Tom',
// 		},
// 		{
// 			playerName: 'Jack',
// 		},
// 		{
// 			playerName: 'Susan',
// 		},
// 		{
// 			playerName: 'Janice',
// 		},
// 		{
// 			playerName: 'Pete',
// 		},
// 		{
// 			playerName: 'Emily',
// 		},
// 		{
// 			playerName: 'Hannah',
// 		},
// 	];

// 	return await PlayerModel.insertMany(playeeers);
// };
