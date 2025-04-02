const { fetchProblemDetails } = require('./apis/problemAdminApi')
const app = require('./app')
const connectToDB = require('./config/dbConfig')

const fastify = require('fastify')({logger:true}) // calling the fastify constructor
const serverConfig = require('./config/serverConfig')
const evaluationWorker = require('./workers/evalutionWorker')

fastify.get('/ping', (req,res) => {
    res.send({data: "pong"})
})

fastify.register(app)

fastify.listen({port : serverConfig.PORT, host:'0.0.0.0'}, async (err) =>{
    if(err){
        fastify.log.error(err) ;
        process.exit(1)
    }
    await connectToDB() 
    evaluationWorker('EvaluationQueue')
    console.log(`Server up and running at ${serverConfig.PORT}`)
    
    // fetchProblemDetails("67e2eab8e1637cc0ab6d1316")
})

