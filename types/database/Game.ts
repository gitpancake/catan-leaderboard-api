import * as Mongoose from 'mongoose';
import { Score } from '../Score';

export interface Game extends Mongoose.Document {
	date: string;
	scores: Score[];
	leagueId?: string;
}
