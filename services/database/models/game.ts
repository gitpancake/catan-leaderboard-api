import * as mongoose from 'mongoose';
import * as Database from '../../../types/database';

const GameSchema: mongoose.Schema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	leagueId: {
		type: String,
		required: false,
	},
});

const GameModel = mongoose.model<Database.Game>('Game', GameSchema);

export { GameModel };
