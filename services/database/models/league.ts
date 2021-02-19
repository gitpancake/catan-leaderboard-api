import * as mongoose from 'mongoose';
import { League } from '../../../types';

const LeagueSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	games: {
		type: [
			{
				type: String,
			},
		],
	},
	totalScores: {
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
	},
});

const LeagueModel = mongoose.model<League>('League', LeagueSchema);

export { LeagueModel };
