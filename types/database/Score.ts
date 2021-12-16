import * as Mongoose from 'mongoose';

export interface Score extends Mongoose.Document {
	playerId: string;
	gameId: string;
	victoryPoints: number;
	cities: number;
	settlements: number;
	longestRoads: number;
	largestArmies: number;
	devPoints: number;
}
