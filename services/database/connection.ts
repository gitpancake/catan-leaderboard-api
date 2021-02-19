import * as mongoose from 'mongoose';

export const createDatabaseConnection = () => {
	mongoose.connect(process.env.DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
