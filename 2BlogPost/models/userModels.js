const mongoose =require('mongoose');
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true ,"user name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true ,"password is required"]
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlZZzWC0mxI0meU3_n53mzCMQ2QTMRE-yI_A&s'
    },
    status: {
    type: String,
    default: "inactive",
  },
},{timestamps:true});


module.exports = mongoose.model("User",userSchema);