const mongoose =require('mongoose');
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true ,"title is required"]
    },
    content:{
        type:String,
        required:[true,"content is required"]
    },
    content_creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"content creator is required"]
    },
    liked_by:{
    type:[mongoose.Schema.Types.ObjectId], 
    },
    status: {
    type: String,
    default: "inactive",
  },
},{timestamps:true});


module.exports = mongoose.model("Post",postSchema);