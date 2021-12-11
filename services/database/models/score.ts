import * as mongoose from 'mongoose';
import * as Database from '../../../types/database';

const ScoreSchema: mongoose.Schema = new mongoose.Schema({
	playerId: {
		type: String,
		required: true,
	},
	gameId: {
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
});

const ScoreModel = mongoose.model<Database.Score>('Score', ScoreSchema);

export { ScoreModel };
