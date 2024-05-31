const userService = require('./service')
const jwt = require('jsonwebtoken')
module.exports = {
    register: async(req,res)=>{
        try{
            if(await userService.findByEmail(req.body.email)&& 
            await userService.findByUsername(req.body.username)){
                res.code(400);
                return{
                    message: "username and email exists" 
                };
            }
            const user = await userService.create(req.body);
            res.code(201);
            return{
                message:"User registration successful",
                data:{user}
            }
        }
        catch(err){
            res.code(500)
            return{err}
        }
    },
    login:async(req,res)=>{
        try{
            const user = await userService.findByUsername(req.body.username);
            
            if(!user){
                res.code(400);
                return{
                    message: "username is wrong"
                };
            }
            let password_flag = !await userService.comparePassword(user.password, req.body.password);
            console.log(`user_password: ${user.password} \n password_flag: ${password_flag}`);
            if(!password_flag){
                res.code(400);
                return{
                    message: 'incorrect password'
                }
            }

            const token = jwt.sign({id: user.id}, 'thisIsaPrivateKey');
            res.code(200);
            return{
                message: "user logged in successfully",
                data:{
                    user, 
                    token
                }
            }
        }catch(err){
            res.code(500);
            return{
                err,
            }
        }
    }
}