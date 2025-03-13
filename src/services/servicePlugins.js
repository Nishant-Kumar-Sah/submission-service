const TestService = require('./testServices')
const fastifyPlugin = require('fastify-plugin')

async function servicePlugin(fastify,option) {
    fastify.decorate('testService',new TestService())
}

module.exports = fastifyPlugin(servicePlugin)