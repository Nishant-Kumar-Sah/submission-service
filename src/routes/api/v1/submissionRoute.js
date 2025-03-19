const { createSubmission } = require("../../../controllers/submissionController")

async function submissionRoutes(fastify, option) {
    fastify.post('/', createSubmission)
}

module.exports = submissionRoutes