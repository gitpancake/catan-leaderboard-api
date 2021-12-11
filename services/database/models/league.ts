import * as mongoose from 'mongoose';
import * as Database from '../../../types/database';

const LeagueSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const LeagueModel = mongoose.model<Database.League>('League', LeagueSchema);

export { LeagueModel };
