const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    the_comment:{
        type:String,
        required:[true,"comment is required"]
    },
    comment_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"The person who has commented is required"]
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:[true,"Post Id is required"]
    },
    liked_by:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
    },
    parent_comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    }
},{timestamps:true});

module.exports=mongoose.model("Comment",commentSchema);