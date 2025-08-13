const mongoose =require('mongoose');
const resturantSchema=new mongoose.Schema({
title:{
    type:String,
    required:[true,"Resturant name is required"]
},
imgUrl:{
    type:String,
    default:""
},
foods:{type:Array},
time:{
    type:String
},
pickup:{
    type:String,
    default:true
},
delivery:{
    type:Boolean,
    default:true
},
isOpen:{
    type:Boolean,
    default:true
},
logoUrl:{
    type:String
},
rating:{
    type:Number,
    default:1,
    min:1,
    max:5
},
ratingCount:{type:Number},
code:{type:String},
coords:{
    id:{type:String},
    latitude:{type:Number},
    latitudeDelta:{type:Number},
    longitude:{type:Number},
    longitudeDelta:{type:Number},
    title:{type:String}
}
},{timestamps:true});


module.exports = mongoose.model("Resturant",resturantSchema);