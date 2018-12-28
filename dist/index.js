'use strict';require('@babel/polyfill');



var _graphqlYoga = require('graphql-yoga');
var _index = require('./resolvers/index');
var _prisma = require('./prisma');var _prisma2 = _interopRequireDefault(_prisma);
var _url = require('url');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}require('dotenv').config({ path: '/Users/rb/Documents/rb-prisma-pro/config/dev.env' });

var pubsub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: _index.resolvers,
    context: function context(request) {
        return {
            pubsub: pubsub,
            prisma: _prisma2.default,
            request: request };

    },
    fragmentReplacements: _index.fragmentReplacements });


server.start({ port: process.env.PORT || 4000 }, function () {
    console.log('Server is running!');
});