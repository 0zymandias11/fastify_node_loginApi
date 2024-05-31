const userController  =require('./controller')
module.exports = async (fastify)=>{
    fastify.post('/register', userController.register);
    fastify.post('/login', userController.login);
};