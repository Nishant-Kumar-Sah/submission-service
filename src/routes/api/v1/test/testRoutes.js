const testControllers = require("../../../../controllers/testController")

async function testRoute (fastify, option){
    fastify.get('/ping', testControllers.pingRequest)
}
module.exports = testRoute