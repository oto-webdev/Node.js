const products = require('./data'); 

const resolvers = {
    Query: {
        products: () => products,
        product: (parent, args) => products.find(product => product.id === args.id),
    },
};

module.exports = resolvers;
