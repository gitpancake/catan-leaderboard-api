import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

require('dotenv').config();

const port = 4000;

const gateway = new ApolloGateway({
	serviceList: [
		{ name: 'leagues', url: 'http://localhost:4001' },
		{ name: 'games', url: 'http://localhost:4002' },
		{ name: 'players', url: 'http://localhost:4003' },
	],
});

const server = new ApolloServer({
	gateway,
	subscriptions: false,
});

server.listen({ port }).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
