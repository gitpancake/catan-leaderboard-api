import { Score, League } from '../../../types';
import { LeagueModel } from '../models/league';
import { GetGameById } from '../games';

export const FindAllLeagues = async (): Promise<League[]> => {
	const leagues = await LeagueModel.find({});

	return leagues;
};

export const FindLeagueById = async (_id: string) => {
	return await LeagueModel.findById(_id);
};

export const CreateLeague = async (name: string): Promise<League> => {
	const NewLeague = new LeagueModel({
		name,
	});

	return NewLeague.save()
		.then((savedLeague) => savedLeague)
		.catch((err) => err);
};

const addScores = (scoreA?: number, scoreB?: number): number => {
	if (!scoreA || isNaN(scoreA)) return scoreB;

	if (!scoreB || isNaN(scoreB)) return scoreA;

	if (isNaN(scoreA) && isNaN(scoreB)) return 0;

	return (scoreA += scoreB);
};

export const AddGameToLeague = async (
	leagueId: string,
	gameId: string,
): Promise<League> => {
	const league = await LeagueModel.findById(leagueId);
	const game = await GetGameById(gameId);

	if (!game) return;

	const totalScores = league.totalScores;
	const gameScores = game.scores;

	const newScores = gameScores.filter(
		(gameScore) =>
			!totalScores
				.map((totalScore) => totalScore.playerName)
				.includes(gameScore.playerName),
	);

	const updatedPlayerScores: Score[] = totalScores.map((score) => {
		const playerLeagueScore = gameScores.find(
			(leagueTotalScore) => leagueTotalScore.playerName === score.playerName,
		);

		if (playerLeagueScore) {
			return {
				playerName: playerLeagueScore.playerName,
				cities: addScores(playerLeagueScore.cities, score.cities),
				settlements: addScores(
					playerLeagueScore.settlements,
					score.settlements,
				),
				longestRoads: addScores(
					playerLeagueScore.longestRoads,
					score.longestRoads,
				),
				largestArmies: addScores(
					playerLeagueScore.largestArmies,
					score.largestArmies,
				),
				devPoints: addScores(playerLeagueScore.devPoints, score.devPoints),
				victoryPoints: addScores(
					playerLeagueScore.victoryPoints,
					score.victoryPoints,
				),
			};
		} else return score;
	});

	return await LeagueModel.findByIdAndUpdate(leagueId, {
		$push: { games: gameId },
		$set: { totalScores: [...newScores, ...updatedPlayerScores] },
	})
		.then((league) => league)
		.catch((err) => err);
};
