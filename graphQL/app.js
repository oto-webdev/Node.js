const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./grqphql/schema'); 
const resolvers = require('./grqphql/resolvers'); 

async function start() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`Server running at ${url}`);
}

start();
