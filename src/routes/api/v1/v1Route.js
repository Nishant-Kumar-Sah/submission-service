async function v1Plugin(fastify, options) {
    fastify.register(require('./submissionRoute'), {prefix: '/submissions'})
}

module.exports = v1Plugin