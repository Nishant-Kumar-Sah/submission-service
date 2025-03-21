const SubmissionService = require('./submissionServices')
const fastifyPlugin = require('fastify-plugin')

async function servicePlugin(fastify,option) {
    fastify.decorate('submissionService',new SubmissionService(fastify.submissionRepository))
}

module.exports = fastifyPlugin(servicePlugin)