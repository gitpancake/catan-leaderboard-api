import * as mongoose from 'mongoose';
import { Game } from '../../../types';

const GameSchema: mongoose.Schema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	scores: {
		type: [
			{
				playerName: {
					type: String,
					required: true,
				},
				victoryPoints: {
					type: Number,
					required: true,
					default: 0,
				},
				cities: {
					type: Number,
					required: true,
					default: 0,
				},
				settlements: {
					type: Number,
					required: true,
					default: 0,
				},
				longestRoads: {
					type: Number,
					required: true,
					default: 0,
				},
				largestArmies: {
					type: Number,
					required: true,
					default: 0,
				},
				devPoints: {
					type: Number,
					required: true,
					default: 0,
				},
			},
		],
		required: true,
	},
});

const GameModel = mongoose.model<Game>('Game', GameSchema);

export { GameModel };
