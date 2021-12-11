import { Document } from 'mongoose';

export type Ref = {
	_id: string;
};

export interface Player extends Document {
	playerName: string;
}

export type Score = {
	playerName?: string;
	victoryPoints: number;
	cities: number;
	settlements: number;
	longestRoads: number;
	largestArmies: number;
	devPoints: number;
};

export interface Schedule {
	cet: Date;
	adt: Date;
	gmt: Date;
}
export interface GameTime extends Document {
	timeOfGame: Date;
}

export interface Game extends Document {
	date: string;
	scores: Score[];
	leagueId?: string;
}

export interface GraphQlGame {
	date: string;
	scores: Score[];
	league: League;
}

export interface GameWithTotals extends Game {
	totals: Score[];
}

export interface League extends Document {
	name: string;
	games?: string[];
	totalScores?: Score[];
}

export type SimpleGame = {
	date: string;
	scores: Score[];
};

export type SimpleLeague = {
	name: string;
	games?: SimpleGame[];
};
