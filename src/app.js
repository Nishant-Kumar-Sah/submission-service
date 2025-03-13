const fastifyPlugin = require('fastify-plugin')
const servicePlugins = require('./services/servicePlugins')

async function app(fastify, option){
    fastify.register(require('@fastify/cors'))
    fastify.register(servicePlugins)
    fastify.register(require('./routes/api/apiRoute'), {prefix: '/api'})
}

module.exports = fastifyPlugin(app)