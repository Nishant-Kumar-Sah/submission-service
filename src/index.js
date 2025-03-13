const app = require('./app')

const fastify = require('fastify')({logger:true}) // calling the fastify constructor

const PORT = 3000

fastify.get('/ping', (req,res) => {
    res.send({data: "pong"})
})

fastify.register(app)

fastify.listen({port : PORT}, (err) =>{
    if(err){
        fastify.log.error(err) ;
        process.exit(1)
    }
    console.log(`Server up and running at ${PORT}`)
    
})

