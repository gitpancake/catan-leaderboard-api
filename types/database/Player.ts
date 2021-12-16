import * as Mongoose from 'mongoose';

export interface Player extends Mongoose.Document {
	playerName: string;
}
