import * as Mongoose from 'mongoose';

export interface League extends Mongoose.Document {
	name: string;
}
