import { Game, Score } from '../../../types';
import { AddGameToLeague } from '../leagues';
import { GameModel } from '../models/game';

export const GetAllGames = async () => {
	return await GameModel.find({});
};

export const GetGameById = async (gameId: string) => {
	return await GameModel.findById(gameId);
};

export const CreateGame = async (
	date: string,
	leagueId: string,
	scores: Score[],
): Promise<Game> => {
	const NewGame = new GameModel({
		date,
		scores,
	});

	const newGameSave = await NewGame.save()
		.then((game) => game)
		.catch((err) => err);

	await AddGameToLeague(leagueId, newGameSave._id, scores);

	return newGameSave;
};
