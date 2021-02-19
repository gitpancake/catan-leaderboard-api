import * as mongoose from 'mongoose';
import { Player } from '../../../types';

const PlayerSchema: mongoose.Schema = new mongoose.Schema({
	playerName: {
		type: String,
		required: true,
	},
});

const PlayerModel = mongoose.model<Player>('Player', PlayerSchema);

export { PlayerModel };
