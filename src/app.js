const fastifyPlugin = require('fastify-plugin')
const servicePlugins = require('./services/servicePlugins')
const repositoryPlugin = require('./repository/repositoryPlugin')

async function app(fastify, option){
    await fastify.register(require('@fastify/cors'))
    await fastify.register(repositoryPlugin)
    await fastify.register(servicePlugins)
    await fastify.register(require('./routes/api/apiRoute'), {prefix: '/api'})
}

module.exports = fastifyPlugin(app)