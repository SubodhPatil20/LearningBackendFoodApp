const userModels = require("./models/userModels")

const getUserData=async(id)=>{
    const userData = await userModels.findById(id).select('-password');
    return userData;

}

module.exports ={getUserData};