const fastify = require('fastify');
const mongoose = require('mongoose');

const app = fastify();

mongoose.connect("mongodb://127.0.0.1:27017/livestream_db",).then(()=>{
    console.log("database connected !!");
}).catch((err)=>{
    console.error(`Error connecting to db ${err}`);
    process.exit(1);
})

app.get('/', async(request, reply)=>{
    reply.code(200);
    return{
        message: 'server is running'
    }
});

app.register(require('./auth/route'), {
    prefix: '/auth'
})

module.exports = app;