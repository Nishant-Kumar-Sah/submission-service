const SubmissionService = require('./submissionServices')
const fastifyPlugin = require('fastify-plugin')

async function servicePlugin(fastify,option) {
    fastify.decorate('submissionService',new SubmissionService())
}

module.exports = fastifyPlugin(servicePlugin)