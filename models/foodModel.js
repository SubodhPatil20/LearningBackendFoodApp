const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    description:{
        type:String,
        reqired:[true,"Description is required"]
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    imgUrl:{
        type:String,
        default:"https://imgs.search.brave.com/d0L1u1D93jS3gbbFmxZ29N17Rpz0SVBy8qwuAAJeFAs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MTU0NjA3MC9waG90/by92ZWdhbi1idWRk/aGEtYm93bC1mb3It/YmFsYW5jZWQtZGll/dC13aXRoLXRvZnUt/cXVpbm9hLXZlZ2V0/YWJsZXMtbGVndW1l/cy1zZWVkcy1hbmQt/c3Byb3V0cy53ZWJw/P2E9MSZiPTEmcz02/MTJ4NjEyJnc9MCZr/PTIwJmM9X2dXeE5R/NzRxY3lMbUhhOEpV/SWd6T2hjV1hmTkNF/LV92LXJYMzRiT1Nu/ND0"
    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String
    },
    isAvailabel:{
        type:Boolean,
        default:false
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resturant"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    }

},{timeStamps:true});

module.exports=mongoose.model("Foods",foodSchema);