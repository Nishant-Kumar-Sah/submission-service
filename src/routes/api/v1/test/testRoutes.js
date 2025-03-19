const testControllers = require("../../../../controllers/submissionController")

async function testRoute (fastify, option){
    fastify.get('/ping', testControllers.pingRequest)
}
module.exports = testRoute