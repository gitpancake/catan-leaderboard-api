import * as mongoose from 'mongoose';
import * as Database from '../../../types/database';

const PlayerSchema: mongoose.Schema = new mongoose.Schema({
	playerName: {
		type: String,
		required: true,
	},
});

const PlayerModel = mongoose.model<Database.Player>('Player', PlayerSchema);

export { PlayerModel };
