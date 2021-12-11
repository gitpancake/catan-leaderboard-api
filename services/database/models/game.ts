import * as mongoose from 'mongoose';
import { Game } from '../../../types';

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

const GameModel = mongoose.model<Game>('Game', GameSchema);

export { GameModel };
