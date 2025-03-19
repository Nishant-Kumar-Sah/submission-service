const app = require('./app')

const fastify = require('fastify')({logger:true}) // calling the fastify constructor
const serverConfig = require('./config/serverConfig')

fastify.get('/ping', (req,res) => {
    res.send({data: "pong"})
})

fastify.register(app)

fastify.listen({port : serverConfig.PORT}, (err) =>{
    if(err){
        fastify.log.error(err) ;
        process.exit(1)
    }
    console.log(`Server up and running at ${serverConfig.PORT}`)
    
})

