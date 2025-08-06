const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
await  mongoose.connect(process.env.DB_NAME);
console.log(`db connected at port ${mongoose.connection.host}`)
    }
    catch(err){
console.log(err,"in connecting db")
    }
}

module.exports = connectDB;