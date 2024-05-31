const User = require('../users/models/user');
const bcrypt = require('bcrypt');

module.exports = {
    findByEmail: async(email)=>{
        return await User.findOne({email});
    },

    findByUserID: async(userID)=>{
        return await User.findById(userID);
    },
    findByUsername: async(username)=>{
        return await User.findOne({username});
    },
    isUsernameExists:async (username)=>{
        return await User.exists({username});
    },
    isEmailExists:async(email)=>{
        return await User.exists({email});
    },
    create: async(data)=>{
        data.password = bcrypt.hashSync(data.password, 10);
        return await User.create(data);
    },
    comparePassword: async(userPassword, password)=>{
        const isCompared = bcrypt.compareSync(userPassword, password);
        return isCompared;
    }
}; 