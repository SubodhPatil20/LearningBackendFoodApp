const foodModel = require("../models/foodModel");


const createFood=async(req,res)=>{
    try {
   const {title,
        description,
        price,
        imgUrl,
        foodTags,
        category,
        code,
        isAvailabel,
        resturant,
        rating,
        ratingCount} =req.body;

        if( !title || !description || !price)
        {
            res.status(404).send({
                success:false,
                message:!title?"Title is missing":!description?"Description is missing":"Price is missing"
            })
        }
    
   const newfood = new foodModel({title, description,  price,  imgUrl,  foodTags,  category,   code,  isAvailabel,  resturant,  rating,  ratingCount});

   await newfood.save();

   res.status(201).send({
    success:true,
    message:"new food is created",
    newfood
   })
} catch (error) {
    res.status(500).send({
        message:"Error in APi of create Food",
        success:false,
        error
    })
}
}

const getAllFood=async(req,res)=>{
    try {
        const allFooditem = await foodModel.find({});

        if(!allFooditem)
        {
    return res.status(404).send({
        message:"No Food Item Found",
        success:false,
    })
      }

      res.status(201).send({
        success:true,
        message:"got all Items",
        allFooditem
      })
    } catch (error) {
        res.status(500).send({
            message:"Error in Api of get All Food items",
            success:false
        })
    }
}
const getSingleFood=async(req,res)=>{
    try {
        const {id} =req.params;
        const allFooditem = await foodModel.findById(id);
        if(!allFooditem)
        {
    return res.status(404).send({
        message:"No Food Item Found",
        success:false,
    })
      }

      res.status(201).send({
        success:true,
        message:"got single Items",
        allFooditem
      })
    } catch (error) {
        res.status(500).send({
            message:"Error in Api of get All Food items",
            success:false
        })
    }
}
module.exports={createFood, getAllFood,getSingleFood}