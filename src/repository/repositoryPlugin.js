const SubmissionRepository= require('./submissionRepository')
const fastifyPlugin = require('fastify-plugin')

async function repositoryPlugin(fastify,option) {
    fastify.decorate('submissionRepository',new SubmissionRepository())
}

module.exports = fastifyPlugin(repositoryPlugin)